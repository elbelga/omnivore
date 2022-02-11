-- Type: UNDO
-- Name: user_articles_reading_percent_float
-- Description: change type of user article reading percent to real/float

BEGIN;

ALTER TABLE omnivore.user_articles
    ALTER column article_reading_progress TYPE smallint USING article_reading_progress::smallint;
COMMIT;
