# Recruiter Validation (QA Engineer I — Automation-leaning)

This repository is designed so a recruiter can validate QA Engineer I capability
without conducting an interview.

## Validation Checklist

1) UI Automation  
   Evidence: tests/ui/register.spec.ts  
   Coverage:
   - Landing page loads
   - Valid child age (8) accepted
   - Invalid child age (4) rejected

2) API Automation  
   Evidence: api_tests/test_api_basic.py  
   Coverage:
   - /api/health
   - /api/register validation rules
   - Error handling

3) SQL Validation Evidence  
   Evidence: docs/sql/sql-validation.md  
   Coverage:
   - Registration count verification
   - Paid payment verification
   - Age rule enforcement at data level

4) Test Design Proof  
   Evidence: docs/test-design/bva.md  
   Technique:
   - Boundary Value Analysis (ages 5–12)

5) CI Proof (GitHub Actions)
   Evidence: GitHub → Actions tab
   Coverage:
   - UI Tests (Playwright)
   - API Tests (pytest)

## Scope Declaration

- Role level: QA Engineer I (automation-leaning)
- Focus: verification through executable and documented evidence
- No senior or architectural claims are made
