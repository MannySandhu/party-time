import { ForbiddenError } from '@casl/ability';
import { subject } from '@casl/ability';

export const enforceAbility = (ability, action, subjectData) => {
  const { type, data } = subjectData;

  if (!data || !data.userId) {
    throw new Error(`Cannot enforce ability: missing data or userId for subject type "${type}"`);
  }

  const normalizedData = {
    ...data,
    userId: data.userId.toString()
  };
  ForbiddenError.from(ability).throwUnlessCan(action, subject(type, normalizedData));
};
