import requests

BASE_URL = "http://localhost:3000"

def test_health_ok():
    r = requests.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_register_accepts_age_8():
    payload = {
        "parent_name": "Coach Lulu",
        "parent_email": "coach@example.com",
        "child_name": "Kid A",
        "child_age": 8
    }
    r = requests.post(f"{BASE_URL}/api/register", json=payload)
    assert r.status_code == 200
    assert "registration_id" in r.json()

def test_register_rejects_age_4():
    payload = {
        "parent_name": "Coach Lulu",
        "parent_email": "coach@example.com",
        "child_name": "Kid B",
        "child_age": 4
    }
    r = requests.post(f"{BASE_URL}/api/register", json=payload)
    assert r.status_code == 400
    assert r.json()["error"] == "child_age_out_of_range"
