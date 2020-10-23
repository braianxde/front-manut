export default class Util {
  static required() {
    return [
      v => !!v || "Campo Obrigatorio"
    ];
  }

  static validPassword() {
    return [
      v => !!v || "Senha Obrigatoria",
      v => !v || v.length > 6 || "Senha deve ser maior que 6 digitos"
    ];
  }

  static validUsuario() {
    return [
      v => !!v || "Usuario Obrigatorio"
    ];
  }

  static validEmail() {
    return [
      v => !!v || "Email Obrigatorio",
      v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email invalido"];
  }

  static currentDate() {
    const date = new Date().toISOString().split("T")[0];

    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    return `${day}/${month}/${year}`;
  }

  static parseDate(date) {
    if (!date) return null;
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
}