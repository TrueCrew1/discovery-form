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

1. Material mutation requires a current claimed Engineering Task Packet from True Crew HQ. If direct Notion access is unavailable, a trusted orchestrator must provide a current Notion-derived packet snapshot before work starts.
2. Set `TRUECREW_TASK_PACKET` to the current packet identity and run `node scripts/ai-preflight.mjs` from the intended isolated worktree before material mutation.
3. Treat a missing task packet or `BLOCKED` result as a stop condition. Never reset/stash/clean/rebase/discard unexpected state or substitute raw chat/model memory to make preflight pass.
4. When the packet supplies branch/base expectations, set `TRUECREW_EXPECTED_BRANCH` and `TRUECREW_EXPECTED_HEAD` before preflight and reconcile the generated runtime context with the packet.
5. `--allow-dirty` and `--allow-production-branch` are read-only/recovery snapshot controls only; they never authorize mutation.
6. Reference/experimental lifecycle is a real constraint: do not expand a reference or experiment into a product/runtime without explicit portfolio reclassification.
7. Baseline validation: Validate static form behavior and Netlify function safety; production delivery/provider activation requires explicit evidence/authority.

## Durable documents to load when applicable

- `README.md`
- `netlify.toml`
- `.env.example`

## Cross-system rule

Provider and customer-product records remain owned by their source systems. Reference code never gains True Crew production authority merely because it is stored in a True Crew repository.
