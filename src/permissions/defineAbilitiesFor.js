import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import logger from '../lib/logger.js';

export function defineAbilitiesFor(user) {
  const { can, rules } = new AbilityBuilder(createMongoAbility);
  logger.debug('[RBAC] building abilities for:', user);

  if (!user) {
    can('create', 'Event');
    const ability = createMongoAbility(rules);
    return ability;
  }

  if (user.role === 'user') {
    can('manage', 'Event', { userId: user.id.toString() });
    can('invite', 'User');
    can('generate', 'InviteLink');
  }

  if (user.role === 'guest') {
    can('read', 'Event', { _id: user.eventId.toString() });
    if (user.editable) can('suggest', 'Event', { _id: user.eventId.toString() });
    if (user.collab) can('manage', 'Event', { _id: user.eventId.toString() });
  }

  if (user.role === 'viewer') {
    can('read', 'Event', { _id: user.eventId.toString() });
  }

  const ability = createMongoAbility(rules);
  ability.user = user;
  return ability;
}
