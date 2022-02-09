export enum TableName {
  // table names for auth database
  AUTH_DB_INFO = "prolanguo_auth_db_info", //databaseVersion: 6
  USER = 'prolanguo_user',
  RESET_PASSWORD_REQUEST = 'prolanguo_reset_password_request',
  USER_EXTRA_DATA = 'prolanguo_user_extra_data',
  API_KEY = 'prolanguo_api_key',
  PURCHASE = 'prolanguo_purchase',

  // table names for shard databases
  SHARD_DB_INFO = "prolanguo_shard_db_info",
  SET = "prolanguo_set",
  SET_EXTRA_DATA = "prolanguo_set_extra_data",
  VOCABULARY = "prolanguo_vocabulary",
  DEFINITION = "prolanguo_definition",
  VOCABULARY_CATEGORY = "prolanguo_vocabulary_category",
  VOCABULARY_WRITING = "prolanguo_vocabulary_writing",
  LESSON_RESULT = "prolanguo_lesson_result",
  LOCK = "prolanguo_lock",
}