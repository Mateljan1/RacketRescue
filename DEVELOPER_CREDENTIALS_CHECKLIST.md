# 🔐 Developer Credentials Checklist

**Before the developer starts, make sure you provide ALL of these:**

---

## ✅ REQUIRED INFORMATION

### 1. **GitHub Access**
- [ ] Developer's GitHub username: _______________
- [ ] Invited to repository: https://github.com/Mateljan1/RacketRescue
- [ ] Access level granted: **Write**
- [ ] Developer confirmed they can clone the repo

---

### 2. **Android Keystore Credentials**
\`\`\`
Keystore Password: gpfUdI4cVD1L
Key Alias: my-key-alias
Key Password: gpfUdI4cVD1L
\`\`\`
✅ **Note:** Keystore file is already in GitHub at `app-builds/android/android.keystore`

- [ ] Password shared securely (1Password/LastPass/Encrypted)
- [ ] Developer confirmed they have the password

---

### 3. **Google Play Console Access**
- [ ] Developer's email: _______________
- [ ] Invited to: https://play.google.com/console
- [ ] Permissions granted:
  - [ ] View app information
  - [ ] Edit store listing
  - [ ] Manage production releases
  - [ ] Manage app signing keys
- [ ] Developer accepted invitation
- [ ] Developer can login successfully

---

### 4. **Apple Developer Access** (for iOS)
- [ ] Developer's email: _______________
- [ ] Invited to: https://appstoreconnect.apple.com
- [ ] Role granted: **App Manager** or **Developer**
- [ ] Developer accepted invitation
- [ ] Developer confirmed they have a Mac with Xcode
- [ ] Developer can login successfully

---

### 5. **Contact Information for Store Listings**

**Support Email:**
\`\`\`
Email: _______________
\`\`\`
- [ ] Provided to developer

**Support Phone (Optional):**
\`\`\`
Phone: _______________
\`\`\`
- [ ] Provided to developer (or marked as "Not using")

**Company Information:**
\`\`\`
Company Name: Racket Rescue
Address: Laguna Beach, CA (or your full address)
\`\`\`
- [ ] Provided to developer

---

### 6. **App Store Account Information**

**Google Play Console:**
- [ ] Account email: _______________
- [ ] Account has payment method set up (for $25 registration fee if new)
- [ ] Developer account is active

**Apple Developer:**
- [ ] Account email: _______________
- [ ] Account has active membership ($99/year)
- [ ] Developer account is active

---

## 🎯 OPTIONAL BUT HELPFUL

### 7. **Screenshots** (if you want to provide them)
If you want specific screenshots, provide:
- [ ] Homepage screenshot
- [ ] Booking flow screenshot
- [ ] Order tracking screenshot

**Otherwise:** Developer can generate these from the APK

---

### 8. **Feature Graphic** (if you have one)
- [ ] 1024x500 PNG banner image for Google Play
- [ ] Or let developer create one from your logo

---

### 9. **Promotional Materials** (optional)
- [ ] Promotional text for store listings
- [ ] Marketing taglines
- [ ] Special launch messaging

**Otherwise:** Developer will use the descriptions from the guides

---

## ❌ NOT NEEDED (Already in GitHub)

The developer does NOT need:
- ❌ .env files (not needed for app store submission)
- ❌ Supabase credentials (not needed for submission)
- ❌ Stripe keys (not needed for submission)
- ❌ NextAuth secrets (not needed for submission)
- ❌ Source code access beyond GitHub (everything is there)

**Why?** The Android app is a PWA wrapper - it just loads your website. All the backend stuff stays on your server.

---

## 📋 QUICK VERIFICATION CHECKLIST

Before developer starts, verify:
- [ ] ✅ GitHub access working
- [ ] ✅ Google Play Console access working
- [ ] ✅ Apple Developer access working (if doing iOS)
- [ ] ✅ Keystore password shared
- [ ] ✅ Support email provided
- [ ] ✅ Developer has read DEVELOPER_HANDOFF_GUIDE.md
- [ ] ✅ Developer confirmed timeline (2-3 hours)
- [ ] ✅ Payment/rate agreed upon

---

## 🔒 SECURITY BEST PRACTICES

### How to Share Credentials Securely:

**Option 1: Password Manager (Best)**
- Use 1Password, LastPass, or Bitwarden
- Create shared vault
- Add credentials
- Share vault with developer
- Revoke access when done

**Option 2: Encrypted Email**
- Use ProtonMail or similar
- Encrypt message with password
- Share password via different channel (phone/SMS)

**Option 3: Secure Note Service**
- Use PrivateBin.net or similar
- Create note with credentials
- Set to auto-delete after reading
- Share link with developer

**❌ DON'T:**
- Send passwords in plain text email
- Share via Slack/Discord without encryption
- Post in public channels

---

## 📞 WHAT TO ASK DEVELOPER BEFORE STARTING

**Questions to confirm:**

1. **"Have you submitted apps to Google Play Store before?"**
   - ✅ Yes = Good to go
   - ❌ No = May need extra time/guidance

2. **"Have you submitted apps to Apple App Store before?"**
   - ✅ Yes = Good to go
   - ❌ No = May need extra time/guidance

3. **"Do you have a Mac with Xcode installed?"** (for iOS)
   - ✅ Yes = Can do iOS
   - ❌ No = Android only, need separate iOS developer

4. **"Can you start within 24-48 hours?"**
   - ✅ Yes = Great
   - ❌ No = Adjust timeline

5. **"What's your rate and payment terms?"**
   - Get clear answer before starting

---

## 💰 PAYMENT STRUCTURE (Recommended)

**Milestone-Based Payment:**

**Milestone 1 (50%):** After both apps submitted
- ✅ Android submitted to Google Play
- ✅ iOS submitted to Apple App Store
- ✅ Confirmation emails received
- **Pay:** 50% of agreed rate

**Milestone 2 (50%):** After both apps approved
- ✅ Android approved and live
- ✅ iOS approved and live
- ✅ Store links provided
- **Pay:** Remaining 50%

**Alternative:** Pay 100% after submission (before approval)

---

## 🎯 DELIVERABLES CHECKLIST

Developer should provide:

### Upon Submission:
- [ ] Screenshot of Google Play Console showing "Pending Review"
- [ ] Screenshot of App Store Connect showing "Waiting for Review"
- [ ] Confirmation emails from both stores
- [ ] Updated GitHub repo with SUBMISSION_RECORD.md

### Upon Approval:
- [ ] Google Play Store link: https://play.google.com/store/apps/details?id=com.racketrescue.www.twa
- [ ] Apple App Store link: https://apps.apple.com/app/racket-rescue/[ID]
- [ ] Final confirmation that both apps are live

---

## ⏱️ TIMELINE EXPECTATIONS

**Developer Work:**
- Setup & verification: 20 minutes
- Android submission: 45 minutes
- iOS submission: 1.5 hours
- Documentation: 15 minutes
- **Total:** 2.5-3 hours

**Review Times:**
- Google Play: 1-3 days
- Apple App Store: 1-2 days
- **Total:** 3-5 days until live

---

## 🚨 RED FLAGS TO WATCH FOR

**Be cautious if developer:**
- ❌ Asks for admin access to your server
- ❌ Requests database credentials
- ❌ Wants access to your Stripe account
- ❌ Asks for more than GitHub + Store Console access
- ❌ Can't explain their app store submission experience
- ❌ Wants payment before starting any work
- ❌ Doesn't have a Mac but promises iOS submission

**These are NOT needed for app store submission!**

---

## ✅ FINAL CHECKLIST

Before you tell developer to start:

- [ ] All access granted and confirmed working
- [ ] All credentials shared securely
- [ ] Payment terms agreed and documented
- [ ] Timeline confirmed (2-3 hours work)
- [ ] Deliverables clearly defined
- [ ] Developer has read all documentation
- [ ] You have their contact info (email, phone, Slack, etc.)
- [ ] You know how to reach them if needed
- [ ] They know how to reach you if stuck

---

## 📧 CONFIRMATION EMAIL TO SEND

Once everything is set up, send this:

\`\`\`
Subject: RacketRescue - All Access Granted, Ready to Start!

Hi [Developer Name],

All access has been granted and you're ready to start!

✅ GitHub: You should have Write access
✅ Google Play Console: Check your email for invitation
✅ Apple Developer: Check your email for invitation
✅ Credentials: Shared via [1Password/LastPass/Encrypted Email]

Next Steps:
1. Clone the repo: https://github.com/Mateljan1/RacketRescue
2. Read: DEVELOPER_HANDOFF_GUIDE.md
3. Submit both apps (2-3 hours)
4. Send me confirmation

Timeline:
- Your work: Today/Tomorrow
- Apps live: Within 5 days

Payment:
- [Your agreed terms]

Questions? Everything is documented in the guides!

Let me know when you start! 🚀

Best,
[Your Name]
\`\`\`

---

## 🎉 YOU'RE ALL SET!

If you've checked all the boxes above, the developer has everything they need to submit your apps!

**Missing anything?** Review this checklist and fill in the gaps before developer starts.

---

**Good luck!** 🎾📱
