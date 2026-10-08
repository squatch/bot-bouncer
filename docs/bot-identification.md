# How Bot Bouncer identifies bots

Bot Bouncer combines automated evaluators with community reports and human review. Its focus is accounts that post or comment automatically without being explicitly summoned, plus certain kinds of inauthentic promotion. It is not a general-purpose spam detector, and it does not treat every automated account as harmful.

## What evaluators examine

When an account posts or comments on a subreddit using Bot Bouncer, lightweight checks first determine whether the new item could match an enabled evaluator. A potential match triggers a fuller check in `/r/BotBouncer`, which can inspect the account and its available post/comment history. The bundled evaluator set includes detectors for these specific patterns:

- **Profile identifiers:** regular expressions for usernames, display names, and bios; configured promotional handles in bios, display names, or post titles; and configured bio keywords written with substitutions or punctuation to disguise them. Some profile checks also consider account age, karma, or NSFW history.
- **Post titles and comments:** configured title patterns, including titles on pinned profile posts; configured phrases in recent comments; certain Telegram-group promotion patterns; and accounts whose recent comments repeatedly copy the titles of the posts they reply to.
- **Links and promotion:** links to configured social accounts or URLs; accounts that share the same external domain across much of their recent history; and configured links reused by multiple accounts that also match relevant social-link patterns.
- **Posting behavior:** accounts that post and then comment on their own posts in configured contexts, suspicious first posts by newer accounts, and accounts whose recent posts span a configured set of otherwise unrelated subreddit groups. Some evaluators also combine post-title, subreddit, moderator, account-age, and karma conditions.
- **Inconsistent claims in post titles:** on selected NSFW posts, evaluators can compare claimed ages or genders across titles and flag accounts that use multiple different values.
- **Media and platform patterns:** image reposts compared with older posts from other users; text extracted from recent NSFW images and checked against configured patterns; and configured Redgifs account or posting patterns.
- **Combined bot-group rules:** configurable criteria can combine account age and karma, username/bio/display name, social links, post or comment text, URLs, subreddit, NSFW status, and other account/content properties. These rules can target a particular account style or promotional behavior using multiple signals together.

The named examples describe detector types, not a promise that every rule is enabled or that every match leads to a bot classification. Many exact patterns, target handles/domains/subreddits, allow/ignore lists, and thresholds are configured by the Bot Bouncer team and can change over time. The evaluator set itself can also change. A single phrase or account feature is therefore not necessarily sufficient to explain a match.

## From a match to a classification

An evaluator can report a possible match without being permitted to automatically classify the account. Evaluators can have minimum-history thresholds, and some are explicitly marked for manual review. High karma, Reddit Premium, administrator status, or being a Bot Bouncer submitter or moderator can also require manual review. If automatic criteria are not met, a submitted account remains pending for the team to review.

Reports from subreddit moderators and other community members help identify accounts for evaluation. Reporters can add context about behavior that may not be obvious from the account's profile or history. Human reviewers can classify an account as a bot, as a human-run account, or as a useful service bot that should not be banned automatically.

## Scope and exemptions

Bot Bouncer targets accounts that make automatic posts or comments without being explicitly summoned, including certain karma-farming, reply-bot, repost, and inauthentic-promotion behaviors. Useful bots that act in response to user requests are generally out of scope. On a client subreddit, moderators and approved users are exempt by default; a user flair CSS class ending in `proof` also prevents enforcement. Subreddit settings may change some of these exemptions and the action taken.

For general information about submitting accounts and appealing classifications, see the README sections on [submitting users for review](../README.md#submitting-users-for-review) and [incorrect classifications](../README.md#dealing-with-classifications-you-feel-are-incorrect).
