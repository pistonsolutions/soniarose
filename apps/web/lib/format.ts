const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const DATE_ONLY_FORMAT = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
});

export function formatDate(value?: string | null) {
  if (!value) {
    return '—';
  }

  try {
    return DATE_FORMAT.format(new Date(value));
  } catch (error) {
    return value;
  }
}

export function formatName(firstName?: string | null, lastName?: string | null) {
  const parts = [firstName, lastName].filter(Boolean);
  if (parts.length === 0) {
    return 'Unnamed contact';
  }

  return parts.join(' ');
}

export function formatOptInStatus(status: string) {
  switch (status) {
    case 'OPTED_IN':
      return 'Opted in';
    case 'OPTED_OUT':
      return 'Opted out';
    case 'UNKNOWN':
    default:
      return 'Unknown';
  }
}

export function formatBytes(size?: number | null) {
  if (!size || Number.isNaN(size)) {
    return '—';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let value = size;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export function formatWorkflowKey(key: string) {
  return key.replace(/_/g, ' ').toLowerCase();
}

export function formatWorkflowStatus(status: string) {
  return status.replace(/_/g, ' ').toLowerCase();
}

export function formatDateOnly(value?: string | null) {
  if (!value) {
    return '—';
  }

  try {
    return DATE_ONLY_FORMAT.format(new Date(value));
  } catch (error) {
    return value;
  }
}
