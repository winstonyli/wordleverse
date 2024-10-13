# Wordleverse 🤓

Find the answer of the day! A collection of LoLdle-esque Wordle clones for fandoms that somehow don't have (a proper) one yet. Statically hosted on Github Pages.

## Additional yapping

If I ever want to scale Wordleverse up to the level of something like LoLdle in the future, it would probably benefit from having an actual backend. However, being frontend-only ended up being a pretty fun and quirky restriction. For example, instead of just deciding the answer on the backend every 24h, I ended up having to use the date as a seed to determine the answer of the day on the frontend. This decision did prevent me from implementing features like tracking win streaks across devices, but it also ended up being a good way to both stimulate creativity and reduce feature creep. You know what they say: restriction breeds creativity.

## Possible improvements, vaguely ordered by priority

- Sharing results as emoji grid
- Different types of challenges (e.g. quote, image, emoji)
- Saving current progress in `localStorage`
