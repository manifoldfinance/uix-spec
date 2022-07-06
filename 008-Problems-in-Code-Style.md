# Problems in Code Style

## Boolean Coercion

Depending on your preferred code style, you may want to get rid of `!= null` when a **boolean coercion** would work. 

> **Warning**  
> Regardless, keep in mind that if the value might be false, '', 0, or NaN, then a boolean coercion may not work as expected.

```javascript
if (currentUser() != null) {
  let left;
  sendMessage((left = customMessage()) != null ? left : 'Hello');
}
```

```javascript
if (currentUser()) {
  sendMessage(customMessage() || 'Hello');
}
```
