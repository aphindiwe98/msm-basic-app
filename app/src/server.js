const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
console.log("Serving static from:", path.join(__dirname, "..", "public"));

const dbPath = path.join(__dirname, "msm.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_name TEXT NOT NULL,
      parent_email TEXT NOT NULL,
      child_name TEXT NOT NULL,
      child_age INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id INTEGER NOT NULL,
      amount_cents INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.post("/api/register", (req, res) => {
  const { parent_name, parent_email, child_name, child_age } = req.body;

  if (!parent_name || !parent_email || !child_name || typeof child_age !== "number") {
    return res.status(400).json({ error: "missing_fields" });
  }
  if (child_age < 5 || child_age > 12) {
    return res.status(400).json({ error: "child_age_out_of_range" });
  }

  const created_at = new Date().toISOString();
  db.run(
    `INSERT INTO registrations (parent_name, parent_email, child_name, child_age, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [parent_name, parent_email, child_name, child_age, created_at],
    function (err) {
      if (err) return res.status(500).json({ error: "db_error" });
      res.json({ registration_id: this.lastID });
    }
  );
});

app.post("/api/checkout", (req, res) => {
  const { registration_id, amount_cents } = req.body;

  if (typeof registration_id !== "number" || typeof amount_cents !== "number") {
    return res.status(400).json({ error: "missing_fields" });
  }

  const created_at = new Date().toISOString();
  const status = "paid"; // simulated payment
  db.run(
    `INSERT INTO payments (registration_id, amount_cents, status, created_at)
     VALUES (?, ?, ?, ?)`,
    [registration_id, amount_cents, status, created_at],
    function (err) {
      if (err) return res.status(500).json({ error: "db_error" });
      res.json({ payment_id: this.lastID, status });
    }
  );
});

app.get("/api/kpis", (req, res) => {
  db.get(`SELECT COUNT(*) as registrations_count FROM registrations`, (err, r1) => {
    if (err) return res.status(500).json({ error: "db_error" });
    db.get(`SELECT COUNT(*) as paid_count FROM payments WHERE status='paid'`, (err2, r2) => {
      if (err2) return res.status(500).json({ error: "db_error" });
      res.json({ registrations_count: r1.registrations_count, paid_count: r2.paid_count });
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
