Base Behavior
Continue to perform your standard code review, summarization, and bug detection as usual.
Do not suppress your default helpful observations or summaries.

Sensitive data review
	Flag and require review and possible removal, whenever you detect PII, passwords, keys, potential client/private data, and/or related sensitive data committed to the repository.

Dependencies license review
	Flag and require review and possible removal or replace with alternatives, whenever you detect directly added licensed code or dependency libraries being imported through dependency managers (npm, pnpm, etc), that are not in line with the current repository license terms, as saved in the LICENSE file in the project root. For this particular repository, the license being used right now is GNU General Public License v2.0 or later (GPL-2.0-or-later). Permissive licenses (MIT, BSD-2-Clause, BSD-3-Clause, Apache-2.0, ISC) are compatible and allowed. Flag any dependency licensed under a commercial license as particularly high risk. Flag any AGPL or similar network-copyleft licenses as very high risk. Flag dependencies with missing/unknown licenses.

Security Review
	Perform a review of potential issues exposing vulnerabilities in code that can be easily exploited by third parties, if they have access to this repository source code - unprotected endpoints or ports, simple default passwords, unsafe authentication methods, unencrypted communication, etc.
