import styles from "./form-new-visit.module.css";
export function FormOfNewVisit() {
  return (
    <div className={styles.place_info}>
<form>
  <label>
    Место:
    <input type="text" name="name" />
  </label>
  <label>
    Дата:
    <input type="date" name="date" />
  </label>
  <label>
    Комментарий:
    <input type="number" name="rating" />
  </label>

  <input type="submit" value="Submit" />
</form>
    </div>
  );
}
