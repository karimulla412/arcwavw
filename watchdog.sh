#!/bin/bash
# Watchdog that keeps the Next.js dev server alive.
cd /home/z/my-project
while true; do
  if ! pgrep -f "next-server" > /dev/null; then
    echo "[$(date)] starting next dev..." >> watchdog.log
    setsid env NODE_OPTIONS="--max-old-space-size=256" nohup bun run dev >> dev.log 2>&1 < /dev/null &
    disown
    sleep 8
  fi
  sleep 3
done
