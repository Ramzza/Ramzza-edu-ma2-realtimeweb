exports.TaskCompleteDTO = {
  title: '',
  description: '',
  owner: '',
  date_starts: null,
  date_ends: null,
  date_reminder: null,
  is_done: false,
  created_at: null,
  created_by: '',
};

exports.defaultValues = {
  is_done: false,
  created_at: Date.now(),
  date_starts: Date.now(),
  date_ends: Date.now(),
};
