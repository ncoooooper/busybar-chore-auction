# Chore Auction

Let two people bid on three chores privately, then split the work by estimated effort.

Each person rates three chores 1–5 by turning and clicking. Between turns the display asks the next player to take over and click. After both sets of bids, the bar checks all splits that give each person at least one chore. It minimizes the higher personal effort total, breaking ties by lower total effort. Wheel browses the results. Hold Start begins new bids.

## Run locally

From this folder, run `~/.busy-emulator/bin/busy-emulator dev --once` with BUSY Bar Emulator open. Back exits.

![BUSY Bar front display](screenshots/front-1.png)
