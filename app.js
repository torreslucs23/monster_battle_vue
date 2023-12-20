const getRandomvalue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    canUseSpecial() {
      return this.round % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackValue = getRandomvalue(5, 20);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomvalue(10, 23);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomvalue(15, 30);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
  },
});

app.mount("#game");
