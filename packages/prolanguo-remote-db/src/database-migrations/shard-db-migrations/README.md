There are currently a few bugs with running migrations with the CLI tool we build.
May have to hack a little by commenting code in `ShardDatabaseMigrationRunner`, mainly the condition for migration to run and 
by commenting migrations that have already run and created tables to allow others to run.

Currently a weird bug, just beware.
See package.json in `prolanguo-script` package for migration commands.

Feb 11, 2022
UPDATE: I strongly advice against using the script now, plan is to re-write. Bugs may be related to the order of shard db migrations