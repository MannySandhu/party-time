export const formatEventLog = (data, maxItems = 3, userId = 'unknown') => {
  if (!data) return 'data:undefined';

  if (Array.isArray(data)) {
    const summary = data.slice(0, maxItems).map(e => {
      const id = e._id || e.id || 'unknown';
      const name = e.eventName || e.name || 'Unnamed';
      return `"${name}" (ID: ${id})`;
    });

    const moreCount = data.length - maxItems;
    const moreText = moreCount > 0 ? `, ...and ${moreCount} more` : '';

    return `UserId: (${userId}) Events: [${summary.join(', ')}${moreText}]`;
  }

  const id = data._id || data.id || 'unknown';
  const name = data.eventName || data.name || 'Unnamed';
  return `"${name}" (ID: ${id})`;
};
