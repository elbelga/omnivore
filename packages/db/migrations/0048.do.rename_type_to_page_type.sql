-- Type: DO
-- Name: rename_type_to_page_type
-- Description: Rename the Article.type field to pageType to not conflict with typescript naming

BEGIN;

ALTER TABLE omnivore.article RENAME COLUMN type TO page_type;

COMMIT;
