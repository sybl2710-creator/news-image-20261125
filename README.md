# The Global Ledger — Wednesday, 25 November 2026

[![make.fun bounty](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125)
[![creator rank](https://make.fun/badge/news-image-20261125/sybl2710-creator/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125)
[![creator reward](https://make.fun/badge/news-image-20261125/sybl2710-creator/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125)

A single broadsheet page that captures one day of world news. The lead story reports
Washington slapping tariffs on fourteen economies. Alongside it, China sends its first
foreign astronaut to the Tiangong station, Israeli judges push to drop the bribery case
against Netanyahu, and a fuel tanker fire in Cairo kills at least thirty people. A narrow
ticker at the foot of the page catches the rest of the day: Poland closing its airspace,
a Houthi drone striking a Riyadh tower and injuring eleven, Ukraine damaging five aircraft
at a Russian air base, a 36% garment wage rise in Bangladesh, hostages freed in Colombia,
and the Solomon Islands signing a security pact with Australia.

## How it is built

`main.ts` is a small Node 22 program that uses only the standard library. It locates its own
directory, reads the finished page next to it, verifies the file stays under the 1 MiB cap,
creates `$MAKEFUN_OUTPUT_DIR` (default `/output`) when needed, and streams `entry.png` into
that directory. The artwork itself was resized once to 1024×1024 and stored as a JPEG payload
named `entry.png`, which keeps it comfortably below the size limit.

```sh
node main.ts
# or, with a custom destination:
MAKEFUN_OUTPUT_DIR=out node main.ts
```

The repository ships `entry.png`, `main.ts`, `package.json`, `README.md`, `LICENSE` and
`.makefun/owner.json`. Nothing is fetched at run time and no dependencies are installed, so
`node main.ts` works from a fresh checkout with Node 22 or newer.

## Verification

- Dimensions: 1024 × 1024 px
- Size: 311,806 bytes (limit 1,048,576)
- Two independent runs, `sha256`:
  - run 1: `30bc3fba37c782c46126dbfee335a46ae00b8b0c59664e3126fb3e303029a547`
  - run 2: `30bc3fba37c782c46126dbfee335a46ae00b8b0c59664e3126fb3e303029a547`
  - outputs are byte-identical

## License

MIT — see `LICENSE`.
