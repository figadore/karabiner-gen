Run `node gen.js > output.json` to create the `manipulators` array to put in the karabiner config file

Place outputs in a wrapper in ~/.config/karabiner/assets/complex_modifications/programmer.json

```
{
  "title": "Reese's",
  "rules": [
    {
      "description": "Switch to programmer symbol keys.",
      "manipulators": [
        <outputs array goes here>
      ]
    }
  ]
}
```

along with the following manipulators
```
    {
      "description": "Post escape if caps is pressed alone, left_ctrl otherwise",
      "manipulators": [
        {
          "from": {
            "key_code": "caps_lock",
            "modifiers": {
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "left_control"
            }
          ],
          "to_if_alone": [
            {
              "key_code": "escape"
            }
          ],
          "type": "basic"
        }
      ]
    },
    {
      "description": "Map left_ctrl to caps_lock.",
      "manipulators": [
        {
          "from": {
            "key_code": "left_control",
            "modifiers": {
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "caps_lock"
            }
          ],
          "type": "basic"
        }
      ]
    }
```

Also switch `command` and `option` if needed (karabiner overrides mac system preferences for swapping modifier keys)
