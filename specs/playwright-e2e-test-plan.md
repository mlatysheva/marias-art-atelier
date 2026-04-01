# Playwright E2E Test Plan - Maria's Art Atelier

## Existing coverage (already implemented)

1. `login e2e user`
   Starting state: logged out user with valid credentials in `playwright/.env`.
   Covered flow: login form submission and redirect to home page.
   Status: implemented in `playwright/login.test.ts`.

2. `create painting from manage page and open edit view`
   Starting state: authenticated user.
   Covered flow: create painting in manage page, upload image, open edit page, then delete.
   Status: implemented in `playwright/create-painting.test.ts`.

3. `seed`
   Status: placeholder only, no assertions, and currently not included by Playwright test match (`.spec.ts` vs `*.test.ts`).

## Assumptions for all scenarios

1. Use a fresh or isolated state per scenario.
2. Use unique test data per run (for example title suffix with timestamp).
3. Clean up created paintings at the end of each scenario.

## Proposed scenarios

### 1. Login validation and authentication error handling

Starting state: logged out user.
Steps:

1. Open `/auth/login`.
2. Submit invalid email and short password.
3. Verify validation errors are shown.
4. Submit valid-format credentials that are incorrect.
5. Verify server error alert is shown and user remains on login page.
   Expected outcome: form validation and backend auth failure are both surfaced clearly.
   Success criteria: error messages are visible and no redirect to `/`.
   Failure conditions: silent failure, missing validation, or accidental successful login.

### 2. Route protection and redirect behavior

Starting state: logged out user.
Steps:

1. Directly navigate to `/`.
2. Verify redirect to `/auth/login`.
3. Navigate to `/manage-paintings`.
4. Verify redirect to `/auth/login`.
   Expected outcome: protected routes require authentication.
   Success criteria: unauthenticated navigation cannot access protected pages.
   Failure conditions: protected content is visible while logged out.

### 3. Signup validation flow

Starting state: logged out user.
Steps:

1. Open `/auth/signup`.
2. Submit empty or invalid values.
3. Verify field-level validation errors.
4. Submit valid values with unique email and username.
5. Verify redirect to `/` and authenticated header state.
   Expected outcome: client validation blocks invalid input and valid signup succeeds.
   Success criteria: errors for invalid data and redirect for valid signup.
   Failure conditions: no validation, unclear error, or no redirect on success.

### 4. Logout flow from avatar menu

Starting state: authenticated user on `/`.
Steps:

1. Open avatar menu.
2. Click `Logout`.
3. Verify user is redirected to login page or protected content is no longer accessible.
4. Attempt to open `/manage-paintings`.
5. Verify redirect to `/auth/login`.
   Expected outcome: session is cleared and protected access is removed.
   Success criteria: post-logout protected routes are blocked.
   Failure conditions: user remains authenticated after logout.

### 5. Manage page create modal cancel behavior

Starting state: authenticated user on `/manage-paintings`.
Steps:

1. Open add modal.
2. Fill several fields and select files.
3. Click `Cancel`.
4. Reopen modal.
5. Verify prior entered values and file names are reset.
   Expected outcome: cancel closes modal and clears transient form state.
   Success criteria: no stale values from canceled draft.
   Failure conditions: old draft data remains unexpectedly.

### 6. Create painting required fields and boundary validation

Starting state: authenticated user on `/manage-paintings`.
Steps:

1. Open add modal.
2. Try submit without required fields (`Title`, `Price`).
3. Set invalid numeric boundaries (for example price below min).
4. Submit.
5. Verify browser or server validation errors are shown and modal remains open.
   Expected outcome: invalid payload is rejected with clear feedback.
   Success criteria: no painting is created and user sees validation guidance.
   Failure conditions: invalid painting gets created.

### 7. Generate description from tags in create form

Starting state: authenticated user on `/manage-paintings`.
Steps:

1. Open add modal.
2. Enter tags.
3. Click `Generate description with Open AI`.
4. Verify loading state appears and then description field is populated.
5. Submit successfully and verify created card exists.
   Expected outcome: AI generation is usable from UI and integrated into submission.
   Success criteria: generated text appears and form submits with it.
   Failure conditions: no loading state, no generated text, or submission regression.

### 8. Painting details page and image carousel interactions

Starting state: authenticated user with a painting that has multiple images.
Steps:

1. Open `/`.
2. Click painting card to open `/paintings/:id`.
3. Verify details are rendered (title, artist, dimensions, materials, price).
4. Use left/right carousel controls and click image area.
5. Verify image slide changes without errors.
   Expected outcome: details page navigation and carousel controls work.
   Success criteria: stable navigation and interactive image browsing.
   Failure conditions: broken route, missing details, or non-functional slider.

### 9. Buy now checkout redirect

Starting state: authenticated user on a painting details page.
Steps:

1. Click `Buy now`.
2. Wait for checkout session response.
3. Verify browser navigates to Stripe checkout URL.
   Expected outcome: buy action redirects to external checkout.
   Success criteria: redirect URL is present and navigation occurs.
   Failure conditions: unhandled error, no redirect, or dead click.

### 10. Edit painting happy path with persistence

Starting state: authenticated user with one existing painting.
Steps:

1. Open `/manage-paintings`.
2. Open edit for target painting.
3. Update title, tags, description, and price.
4. Click `Update`.
5. Verify return navigation and updated values visible on card/details page.
   Expected outcome: edits persist and UI refreshes correctly.
   Success criteria: updated values survive reload.
   Failure conditions: stale values after update or failed save.

### 11. Edit image management (remove existing + add new)

Starting state: authenticated user editing a painting with existing image names.
Steps:

1. Open edit page.
2. Remove one existing image using delete icon.
3. Upload one new image.
4. Submit update.
5. Reopen edit or details page and verify image list reflects removal and addition.
   Expected outcome: image keep/remove logic works correctly.
   Success criteria: removed image absent and new image present after save.
   Failure conditions: deleted image still present or uploaded image missing.

### 12. Delete painting dialog behavior (cancel and confirm)

Starting state: authenticated user on `/manage-paintings` with at least one painting.
Steps:

1. Click delete icon for a painting.
2. Dismiss confirm dialog.
3. Verify painting remains.
4. Trigger delete again and accept confirm dialog.
5. Verify painting card disappears after refresh.
   Expected outcome: confirm dialog gates destructive action correctly.
   Success criteria: cancel keeps data, confirm removes data.
   Failure conditions: accidental deletion on cancel or no deletion on confirm.

### 13. Responsive navigation (mobile menu)

Starting state: authenticated and logged-out variants, using mobile viewport.
Steps:

1. Open app on iPhone-sized viewport.
2. Open hamburger menu.
3. Verify correct items for logged-out state (`Login`, `Signup`).
4. Login and reopen menu.
5. Verify authenticated navigation and avatar menu still functional.
   Expected outcome: mobile navigation works for both auth states.
   Success criteria: menu links are visible, clickable, and route correctly.
   Failure conditions: inaccessible menu items or broken routing on mobile.

### 14. Real-time refresh after painting updates

Starting state: two browser contexts authenticated as relevant users.
Steps:

1. Open available paintings in context A and context B.
2. In context A, purchase or update/delete a painting.
3. In context B, wait for socket-driven refresh.
4. Verify paintings list updates without manual refresh.
   Expected outcome: websocket-triggered updates keep UI in sync.
   Success criteria: list changes appear automatically.
   Failure conditions: stale list until hard refresh.
