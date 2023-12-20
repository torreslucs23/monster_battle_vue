const getRandomvalue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomvalue(5, 20);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomvalue(5, 23);
      this.playerHealth -= attackValue;
    },
  },
});

app.mount("#game");
