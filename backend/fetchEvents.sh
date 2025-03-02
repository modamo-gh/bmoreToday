#!/bin/bash
echo "Running fetch events at $(date)" >> fetchEvents.log
node dist/src/scripts/fetchEvents.js >> fetchEvents.log 2>&1
echo "Fetch complete at $(date)" >> fetchEvents.log