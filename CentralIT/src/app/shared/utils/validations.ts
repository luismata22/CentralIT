export class Validations{
    keyPressEmail(event) {
        var inp = String.fromCharCode(event.keyCode);
        if (/^[a-zA-ZäÄëËïÏöÖüÜáéíóúÁÉÍÓÚñÑ\s]*$/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
}