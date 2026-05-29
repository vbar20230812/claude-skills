---
name: backup-firebase
description: Backup Firebase Firestore production data to local file and Firebase Storage
---

# Backup Firebase Production Data

Create a complete backup of Firebase Firestore production data.

**Announce at start:** "Creating Firebase production backup."

## What This Does

1. Exports all Firestore collections from production (`assetflow-backend-2024`)
2. Filters out collections starting with "OBSOLETE"
3. Saves backup locally to `backups/` folder with timestamp
4. Uploads backup to Firebase Storage

## Steps

1. **Navigate to the directory with the backup script:**
   ```bash
   cd /c/Users/victo/Projects/assetflow3
   ```

2. **Ensure the backup script exists and uses production credentials:**
   - Script: `backup_firestore.js`
   - Must use: `serviceAccountKey_prod.json`
   - Must use bucket: `assetflow-backend-2024.firebasestorage.app`

3. **Run the backup script:**
   ```bash
   node backup_firestore.js
   ```

4. **Wait for completion:**
   - The script will export each collection
   - Show progress as it goes
   - Report total collections, documents, and file size

5. **Verify the backup was created:**
   - Check local file in `backups/` folder
   - Check Firebase Storage console

## Expected Output

```
Fetching all collections...
Found X non-OBSOLETE collections: [...]
Exporting ...

=== Local Backup Complete ===
Path: backups\firestore_TIMESTAMP.json
Collections: X
Total Documents: XXXX
File Size: X.XX MB

=== Uploading to Firebase Storage ===
✅ Uploaded to: backups/firestore_TIMESTAMP.json
Storage URL: gs://assetflow-backend-2024.firebasestorage.app/backups/...
Download URL: https://firebasestorage.googleapis.com/v0/b/...
```

## Final Output

```text
═══════════════════════════════════════════════════════════
  ✅ FIRESTORE BACKUP COMPLETE
═══════════════════════════════════════════════════════════

Project: assetflow-backend-2024 (PRODUCTION)
Collections: X
Documents: XXXX
File Size: X.XX MB

Local: backups\firestore_TIMESTAMP.json
Storage: gs://assetflow-backend-2024.firebasestorage.app/backups/...
Console: https://console.firebase.google.com/u/0/project/assetflow-backend-2024/storage/

═══════════════════════════════════════════════════════════
```

## Important Notes

- This backs up PRODUCTION data (`assetflow-backend-2024`)
- Only backs up non-OBSOLETE collections
- Creates timestamped backup files (e.g., `firestore_2026-02-23T11-51-24-634Z.json`)
- Stored locally AND in Firebase Storage for redundancy
- No data is modified during backup (read-only operation)
