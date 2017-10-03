const yaml = require('js-yaml');
const fs = require('fs');
const clone = require('clone');

const keycodeMap = yaml.safeLoad(fs.readFileSync('keycode-map.yml', 'utf8'));
const replacements = yaml.safeLoad(fs.readFileSync('replacements.yml', 'utf8'));

const manipulators = []

// console.log({keycodeMap})
// console.log({replacements})
// console.log(util.inspect(keycodeMap, {showHidden: false, depth: null}));
// console.log(util.inspect(replacements, {showHidden: false, depth: null}));
// console.log(pretty(keycodeMap));
// console.log(pretty(replacements));

function getKeyCode(key) {
  for (let i = 0; i < keycodeMap.length; i += 1) {
    const entry = keycodeMap[i]
    if (entry.key === key) {
      return entry.code
    }
  }
  return {
    name: key
  };
}

const modifiers = {
  optional: [
    "caps_lock",
    "left_command",
    "left_control",
    "left_option",
    "right_command",
    "right_control",
    "right_option"
  ]
}

for (let i = 0; i < replacements.length; i += 1) {
// for (let i = 0; i < 3; i += 1) {
  const replacement = replacements[i];
  // console.log({replacement});
  const original = getKeyCode(replacement.key)
  const updated = getKeyCode(replacement.replacement)
  // console.log({original});
  // console.log({updated});
  // Clone optional modifiers
  original.modifiers = clone(modifiers);
  if (original.modifier === "shift") {
    original.modifiers.mandatory = ["left_shift"];
  }
  if (updated.modifier === "shift") {
    updated.modifiers = [
      "left_shift"
    ];
  }
  const manipulator = {
    type: "basic",
    from: {
      key_code: original.name,
      modifiers: original.modifiers
    },
    to: [
      {
        key_code: updated.name,
        modifiers: updated.modifiers,
      }
    ]
  }
  manipulators.push(manipulator)
  // console.log("manipulators", JSON.stringify(manipulators, null, 4));
  if (original.modifier === "shift") {
    const altManipulator = clone(manipulator);
    altManipulator.from.modifiers.mandatory = ["right_shift"]
    manipulators.push(altManipulator)
  }
}

// console.log("output", util.inspect(manipulators, false, null));
console.log("output", JSON.stringify(manipulators, null, 2));
