# Wizard Implementation Notes

## User provided a complete Troubleshooting Wizard component
- Full decision tree with ~30 nodes
- Node types: safety-gate, question, action, stop, resolved, call-tech
- Features: progress dots, safety banner, back navigation, copy script to clipboard
- Electrical-focused troubleshooting flow
- Includes "What to Say When You Call" scripts for each call-tech endpoint

## Rebrand Requirements
- Site name: "Before You Call" (was "FixIt Guide")
- Domain: Beforeyoucall.app
- Tagline: "If It's Smokin', It's Broken"

## Tasks
- [ ] Rebrand all references from "FixIt Guide" to "Before You Call"
- [ ] Add tagline throughout
- [ ] Convert the wizard to use our design system (Workshop Blueprint)
- [ ] Add wizard as a new route (/wizard)
- [ ] Link wizard from header nav and electrical category page
- [ ] Update page title in index.html
