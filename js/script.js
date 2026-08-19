const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const dilution = document.querySelector('[data-dilution]');
const potency = document.querySelector('[data-potency]');
const ratio = document.querySelector('[data-ratio]');
const title = document.querySelector('[data-title]');
const description = document.querySelector('[data-description]');
const drop = document.querySelector('.drop');
const states = [
  ['1C', '1 : 100', 'Одна часть вещества', 'На каждом шаге берут одну часть раствора и добавляют 99 частей воды. Затем повторяют снова.'],
  ['12C', '1 : 10²⁴', 'Предел молекул', 'Уже здесь шанс встретить молекулу исходного вещества становится крайне малым.'],
  ['24C', '1 : 10⁴⁸', 'Почти только растворитель', 'Степень разведения превосходит привычные физические масштабы — но эти средства продолжают продавать как лечебные.'],
  ['30C', '1 : 10⁶⁰', 'Ноль ожидаемых молекул', 'Популярное разведение: единица с шестьюдесятью нулями. На этикетке есть название вещества, в грануле его, вероятнее всего, нет.']
];

dilution.addEventListener('input', () => {
  const [level, value, heading, copy] = states[Number(dilution.value)];
  potency.textContent = level;
  ratio.textContent = value;
  title.textContent = heading;
  description.textContent = copy;
  drop.style.transform = `rotate(45deg) scale(${1 - Number(dilution.value) * .22})`;
  drop.style.opacity = String(1 - Number(dilution.value) * .28);
});

const checks = [...document.querySelectorAll('.checklist input')];
const result = document.querySelector('[data-check-result]');
const count = document.querySelector('[data-check-count]');
const messages = [
  'Отметьте вопросы, ответы на которые удалось проверить.',
  'Проверено: 1 из 4. Пока слишком мало данных, чтобы принимать решение о покупке.',
  'Проверено: 2 из 4. Половина вопросов всё ещё без ответа. Не спешите покупать.',
  'Проверено: 3 из 4. Почти всё. Проверьте последний пункт — он тоже может изменить решение.',
  'Все 4 пункта проверены. Теперь смотрите не на количество галочек, а на ответы.'
];
checks.forEach(check => check.addEventListener('change', () => {
  const checked = checks.filter(item => item.checked).length;
  count.textContent = `${checked} / 4`;
  result.textContent = messages[checked];
}));
