# Security Test Plan: Mahi UI Component Playground

**Date:** 2026-10-11  
**Scope:** Client-side sanitization, URL validation, and untrusted payload defenses  

---

## 1. Test Objectives

Ensure that:
1. **JSON file upload** cannot cause prototype pollution or execute malicious scripts through crafted property keys.
2. **External resource links** cannot execute client-side scripts via `javascript:`, `vbscript:`, or `data:` URIs.
3. **No untrusted code execution (`eval`, `new Function`)** exists in client-side bundles.
4. **HTML injection attacks** cannot compromise user sessions or storage.

---

## 2. Test Execution Matrix

| Test Case | Description | Input Vector | Expected Result | Automated Test Suite |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Prototype Pollution Injection | Payload with `__proto__`, `constructor`, or `prototype` keys | Throws validation error; prevents Object prototype mutation | `tests/unit/security-regression.test.js` |
| **SEC-02** | XSS Script Tag Filtering | Bookmark ID containing `<script>alert(1)</script>` | Stripped of `<>"';` characters | `tests/unit/security-regression.test.js` |
| **SEC-03** | Malicious URL Scheme Rejection | Links formatted as `javascript:alert(1)` or `data:text/html,...` | Rejects scheme; returns `false` | `tests/unit/security-regression.test.js` |
| **SEC-04** | Payload Size Limit | JSON file import exceeding 2MB | Rejected immediately with user toast notice | Implemented in `src/app/page.tsx` |
| **SEC-05** | Dangerous Function Construction | AST grep for `eval(`, `new Function(` | Zero violations detected | `scripts/lint.js` |

---

## 3. Execution Command

Run the automated security regression suite:
```bash
node tests/unit/security-regression.test.js
```
Expected output:
```text
🔒 Running Security & Input Validation Regression Tests...

✅ 1. Prototype pollution protection verified
✅ 2. Bookmark ID XSS sanitization verified
✅ 3. Safe URL scheme validation verified (blocked javascript: and data: schemes)

🎉 ALL SECURITY REGRESSION TESTS PASSED CLEANLY!
```
