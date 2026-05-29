---
name: backup-firebase
description: >
  Backup Firebase Firestore data for dev or prod environments using gcloud native export.
  Triggers on: "backup firebase", "backup firestore", "backup production data",
  "create backup", "firestore export", "database backup".
---

# Backup Firebase Firestore Data

Export all Firestore data to Google Cloud Storage using `gcloud firestore export`.

## Environments

| Environment | Source Project | Destination Bucket | Backup Project |
|-------------|---------------|-------------------|----------------|
| prod | `assetflow-backend-2024` | `assetflow-prod-backups-me-west1` | `assetflow-prod-backups` (IAM-isolated) |
| dev | `assetflow-dev-f6fa5` | `assetflow-dev-firestore-backups` | same as source |

## Prerequisites

1. **gcloud CLI** installed and authenticated:
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```
2. **Correct project access** — your Google account must have:
   - `Cloud Datastore Import/Export Admin` on the source project
   - `Storage Object Creator` on the backup bucket
3. **Windows TLS note**: If gcloud commands fail with certificate errors, set:
   ```bash
   export NODE_OPTIONS="--use-system-ca"
   ```

## Steps

1. **Announce at start:** "Creating Firestore backup for [dev|prod]."

2. **Run the backup script from project root:**
   ```bash
   bash scripts/backup-firestore-manual.sh prod
   ```
   Or for dev:
   ```bash
   bash scripts/backup-firestore-manual.sh dev
   ```

3. **The script outputs** the export URI and an async operation name. The export
   runs server-side — the command returns immediately.

4. **Monitor progress:**
   ```bash
   gcloud firestore operations list --project=assetflow-backend-2024
   ```
   Wait for status `SUCCESSFUL`. For ~10 MB of data, expect 2-5 minutes.

5. **List existing backups:**
   ```bash
   gcloud storage ls gs://assetflow-prod-backups-me-west1/firestore-backup/ --project=assetflow-prod-backups
   ```

6. **Verify the backup:**
   ```bash
   gcloud storage ls --recursive gs://assetflow-prod-backups-me-west1/firestore-backup/<TIMESTAMP>/
   ```
   Confirm the folder contains `*.overall_export_metadata` and collection output files.

## Automated Backups

Production has a scheduled cloud function that runs weekly (Monday 3:03 AM IST):

- **Function:** `firestoreBackup` in `functions/index.js`
- **Trigger:** Cloud Scheduler with OIDC authentication
- **Retention:** 28 days (4 weekly backups, auto-deleted by bucket lifecycle rules)
- **Max data loss window:** 7 days

Manual backups supplement the automated schedule — run before risky operations
(schema changes, rule updates, bulk data migrations).

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| `PERMISSION_DENIED` | gcloud not authenticated or wrong account | Run `gcloud auth login` and verify with `gcloud config get-value account` |
| `NOT_FOUND` on bucket | Bucket doesn't exist or wrong project context | Verify bucket name matches the table above |
| `ALREADY_EXISTS` | Export with same timestamp already running | Wait for the existing operation to complete |
| Certificate/TLS errors | Windows Schannel cert revocation check | Set `export NODE_OPTIONS="--use-system-ca"` |
| `OPERATION_TOO_LARGE` | Data exceeded single-export limit | Contact GCP support; split by collection-ids |

## Restore Procedure

For disaster recovery, follow the full restore procedure documented at:
```
scripts/RESTORE-PROCEDURE.md
```

Quick restore reference:
```bash
# Merge restore (safe — adds data, does not delete)
gcloud firestore import gs://assetflow-prod-backups-me-west1/firestore-backup/<TIMESTAMP> \
  --project=assetflow-backend-2024 --async

# Restore specific collections only
gcloud firestore import gs://assetflow-prod-backups-me-west1/firestore-backup/<TIMESTAMP> \
  --project=assetflow-backend-2024 --collection-ids='userData' --async
```

## Important Notes

- The export is a **read-only operation** — no data is modified in Firestore
- Exports capture data as it runs; concurrent writes may be partially included
- Backups do NOT include: Firebase Auth users, Storage files, Security Rules, or Indexes
- Auth users can be backed up separately: `firebase auth:export users.csv --project=assetflow-backend-2024`
- Encrypted fields (payments) restore correctly as long as encryption keys
  (`userData/{uid}/private/encryptionKey`) are in the backup
