# Repository AI Context — True Crew Discovery Form

Status: repository-local AI context. Engineer-standard remains the cross-repository engineering authority.

## Repository identity

- Repository: `TrueCrew1/discovery-form`
- Product/role: Validation-stage lead magnet / operations gap finder with Netlify/Resend boundary.
- Lifecycle: validation lead magnet
- Canonical True Crew agent runtime: Node `24.19.0`

## Ownership

**Owns:** Discovery form UX, lead-magnet content, Netlify function boundary, and form-delivery behavior.

**Does not own:** CRM system-of-record data, customer-product application logic, Command Center workflow state, or general True Crew website authority.

## Data/runtime boundary

No canonical CRM/customer database. Form delivery is an external-service boundary; downstream CRM/provider records remain provider-owned.

## Deployment boundary

Netlify lead-magnet deployment only. Production deploy, Resend/provider changes, recipient/config changes, and secret changes remain separately authorized.

## AI execution contract

1. Run `node scripts/ai-preflight.mjs` from the intended isolated worktree before material mutation.
2. Treat `BLOCKED` as a stop condition. Never reset/stash/clean/rebase/discard unexpected state to make the preflight pass.
3. When a packet supplies branch/base expectations, set `TRUECREW_EXPECTED_BRANCH`, `TRUECREW_EXPECTED_HEAD`, and `TRUECREW_TASK_PACKET`.
4. `--allow-dirty` and `--allow-production-branch` are read-only/recovery snapshot controls only.
5. Reference/experimental lifecycle is a real constraint: do not expand a reference or experiment into a product/runtime without explicit portfolio reclassification.
6. Baseline validation: Validate static form behavior and Netlify function safety; production delivery/provider activation requires explicit evidence/authority.

## Durable documents to load when applicable

- `README.md`
- `netlify.toml`
- `.env.example`

## Cross-system rule

Provider and customer-product records remain owned by their source systems. Reference code never gains True Crew production authority merely because it is stored in a True Crew repository.
