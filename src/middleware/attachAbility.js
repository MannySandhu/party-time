import { defineAbilitiesFor } from '../permissions/defineAbilitiesFor.js';

const attachAbility = (req, res, next) => {
  const user = req.user || null;
  req.ability = defineAbilitiesFor(user);
  next();
};

export default attachAbility;
