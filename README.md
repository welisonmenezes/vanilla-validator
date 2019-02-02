# Vanilla Validator
A pure Javascript form validator.
___

## Basic Usage
### Instalation

```
<script src='dist/vanilla-validator.concat.min.js'></script>
```
Or, you can call the scripts separately:

```
<script src='dist/vv-elements.min.js'></script>
<script src='dist/vv-checks.min.js'></script>
<script src='dist/vanilla-validator.min.js'></script>
```
### Initialization
```
<script>
  var validator = new VanillaValidator({});
</script>
```
### The HTML

To work correctly, you must use the plugin's configured classes on form elements.

You can custom each class. See  the [documentation](https://welisonmenezes.github.io/vanilla-validator/).
```
<form>
  <div>
    <input type='text' class='required' placeholder='Name'>
  </div>
  <div>
    <input type='text' class='email' placeholder='Email'>
  </div>
  <input type='submit'>
</form>
```
### The config object
You have to pass a configuration object as parameter when to instantiate  _VanillaValidator_.

If you pass a empty object the  _VanillaValidator_  will use the default configurations.

However, you can customize your validator. Example:
```
<script>
var config = {
  container: '#my-form-id',
  validationBy: 'onclick',
  button: '.my-button-class',
  validateOnFieldChanges: true,
  selectors: {
    required: 'my-required-field-class'
  }
};
var validator = new VanillaValidator(config);
</script>
```
See more at the [documentation](https://welisonmenezes.github.io/vanilla-validator/).