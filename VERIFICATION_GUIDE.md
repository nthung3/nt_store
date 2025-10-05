# ✅ Authentication Verification Guide

Quick guide to verify all authentication features are working correctly.

---

## 🚀 Prerequisites

1. **Backend Server Running**
   ```bash
   # Make sure your backend is running on port 8888
   # Check: http://localhost:8888/v1/health (if you have a health endpoint)
   ```

2. **Frontend Server Running**
   ```bash
   npm run dev
   # Should be running on http://localhost:3000
   ```

---

## 🧪 Manual Testing Steps

### **Test 1: Signup Flow** ✅

1. Navigate to http://localhost:3000/signup
2. **Check:** First name field should auto-focus
3. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@test.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. **Check:** Password field should have eye icon (visibility toggle)
5. Click the eye icon
6. **Check:** Password should become visible
7. Click Submit
8. **Expected Results:**
   - ✅ Loading spinner appears
   - ✅ Success toast notification
   - ✅ Redirected to home page (/)
   - ✅ Profile icon appears in navbar (top right)
   - ✅ Click profile → See "John Doe" and email

**If any step fails, check browser console for errors**

---

### **Test 2: Login Flow** ✅

1. Logout (if logged in from Test 1)
2. Navigate to http://localhost:3000/login
3. **Check:** Email field should auto-focus
4. Fill in the form:
   - Email: `john.doe@test.com`
   - Password: `password123`
5. **Check:** Password field has eye icon
6. Click Submit
7. **Expected Results:**
   - ✅ Loading spinner appears
   - ✅ Success toast notification
   - ✅ If admin (role=0): Redirected to /admin
   - ✅ If user (role=1): Redirected to home (/)
   - ✅ Profile dropdown shows user info

---

### **Test 3: Profile Persistence** ✅

1. Login successfully (from Test 2)
2. **Check:** Profile icon visible in navbar
3. Refresh the page (F5 or Ctrl+R)
4. **Expected Results:**
   - ✅ Still logged in (no redirect to /login)
   - ✅ Profile icon still visible
   - ✅ Profile dropdown still shows user data
   - ✅ No console errors

---

### **Test 4: Logout Flow** ✅

1. Click profile icon in navbar
2. Click "Logout"
3. **Expected Results:**
   - ✅ Info toast: "You have been logged out"
   - ✅ Redirected to home page
   - ✅ Profile icon replaced with "Log In" button
   - ✅ localStorage cleared (check DevTools → Application → Local Storage)

---

### **Test 5: Form Validation** ✅

#### **Login Validation:**
1. Go to /login
2. Click Submit (empty form)
3. **Check:** Email and password error messages appear
4. Type invalid email: `notanemail`
5. **Check:** "Please enter a valid email" error
6. Type short password: `123`
7. **Check:** "Password must be at least 6 characters" error

#### **Signup Validation:**
1. Go to /signup
2. Click Submit (empty form)
3. **Check:** All required field errors appear
4. Type mismatched passwords
5. **Check:** "Passwords do not match" error

---

### **Test 6: Real-Time Error Clearing** ✅

1. Go to /login
2. Submit empty form (trigger errors)
3. **Check:** Email and password errors visible
4. Start typing in email field
5. **Check:** Email error disappears immediately
6. Start typing in password field
7. **Check:** Password error disappears immediately

---

### **Test 7: API Error Handling** ✅

1. Stop backend server
2. Try to login
3. **Expected Results:**
   - ✅ Error toast: "No response from server"
   - ✅ Form stays on page (no redirect)
   - ✅ Loading spinner stops
   
4. Start backend server
5. Try to login with wrong credentials
6. **Expected Results:**
   - ✅ Error toast from backend (e.g., "Invalid credentials")
   - ✅ Form stays on page

---

### **Test 8: Password Visibility Toggle** ✅

1. Go to /login or /signup
2. Type password: `testpassword123`
3. **Check:** Password shows as dots: `•••••••••••••••`
4. Click eye icon
5. **Check:** Password shows as text: `testpassword123`
6. Click eye icon again
7. **Check:** Password hidden again: `•••••••••••••••`

---

### **Test 9: Auto-Focus Behavior** ✅

1. Navigate to /login
2. **Check:** Email field is focused (cursor blinking)
3. Start typing immediately (no click needed)
4. Navigate to /signup
5. **Check:** First name field is focused
6. Start typing immediately

---

### **Test 10: Profile Dropdown** ✅

1. Login successfully
2. Click profile icon/dropdown
3. **Expected Results:**
   - ✅ Dropdown menu opens
   - ✅ Shows user name
   - ✅ Shows user email
   - ✅ "Account settings" link visible
   - ✅ "Documentation" link visible
   - ✅ "Invite a friend" disabled (coming soon)
   - ✅ "Logout" button visible

4. Click outside dropdown
5. **Check:** Dropdown closes

---

## 🔍 Console Verification

Open browser DevTools (F12) → Console tab

### **Expected:** No errors ✅

### **Acceptable:** These warnings can be ignored
- Prettier formatting warnings (in development only)
- CRLF line ending warnings (Windows line endings)

### **Not Acceptable:** Report these
- TypeScript errors
- React errors
- API 404/500 errors (except during testing)
- Redux errors

---

## 🛠️ Debugging Tools

### **Check Redux State**
1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Navigate through actions to see state changes
4. **Check:** After login, `auth.user` should be populated

### **Check LocalStorage**
1. Open DevTools → Application tab
2. Navigate to Local Storage → http://localhost:3000
3. **Check:** After login, should see:
   - `token`: JWT string
   - `role`: "0" or "1"

### **Check Network Requests**
1. Open DevTools → Network tab
2. Filter: "Fetch/XHR"
3. Login or signup
4. **Expected Requests:**
   - `POST http://localhost:8888/v1/auth/login` → 200 OK
   - `POST http://localhost:8888/v1/auth/signup` → 201 Created
   - `GET http://localhost:8888/v1/auth/profile` → 200 OK (after page refresh)

---

## 🎯 Quick Smoke Test (30 seconds)

```
1. npm run dev
2. Go to /signup
3. Fill form → Submit
4. ✅ Redirected to home + Profile visible
5. Refresh page
6. ✅ Still logged in
7. Click profile → Logout
8. ✅ Back to guest mode
```

**All passed? You're good to go! 🎉**

---

## 🐛 Common Issues & Solutions

### **Issue: API 404 Error**
```
POST http://localhost:3000/undefined/v1/auth/login 404
```
**Solution:** ✅ Already fixed! Base URL now defaults to `http://localhost:8888/v1`

---

### **Issue: Profile Component Crash**
```
Cannot read properties of undefined (reading 'name')
```
**Solution:** ✅ Already fixed! Profile component now has defensive checks

---

### **Issue: Redux `result` undefined**
```
Cannot find name 'result'
```
**Solution:** ✅ Already fixed! Changed to `user` in navbar components

---

### **Issue: CORS Error**
```
Access to fetch at 'http://localhost:8888/v1/auth/login' blocked by CORS
```
**Solution:** Enable CORS in backend:
```javascript
// Backend Express.js
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

---

### **Issue: Token Not Persisting**
**Symptoms:** Redirected to /login after page refresh

**Check:**
1. DevTools → Application → Local Storage
2. Is `token` present?
   - **No:** Backend not returning token
   - **Yes:** Check auth slice `getProfile` thunk

**Solution:** Check `auth-slice.ts` lines 88-93

---

## 📊 Expected Results Summary

| Test | Status | Expected Behavior |
|------|--------|-------------------|
| Signup | ✅ | Creates account, logs in, redirects |
| Login | ✅ | Authenticates, redirects based on role |
| Logout | ✅ | Clears state, redirects to home |
| Profile | ✅ | Displays user info, no crashes |
| Validation | ✅ | Shows errors, clears on typing |
| Auto-focus | ✅ | First field focused on load |
| Password Toggle | ✅ | Shows/hides password text |
| Token Persistence | ✅ | Stays logged in after refresh |
| API Errors | ✅ | Shows toast, stays on page |
| 401 Handling | ✅ | Auto-logout, redirect to login |

---

## ✅ All Tests Passed?

**Congratulations!** 🎉 Your authentication system is working perfectly!

**Next Steps:**
1. Test with real backend data
2. Test admin vs user role differences
3. Test profile update functionality
4. Deploy to staging environment

---

## 📞 Need Help?

Check these files for details:
- `AUTH_PAGES_OPTIMIZATION.md` - UI optimization details
- `PROFILE_BUG_FIX.md` - Profile component fixes
- `AUTHENTICATION_STATUS.md` - Complete system overview

**Happy testing!** 🚀
