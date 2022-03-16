const app = Vue.createApp({
  data() {
    return {
      nombre: "MELTAN",
      numero: "808",
      altura: 0.2,
      peso: 8,
      habilidad: "MAGNET PULL",
      habilidad2: "TINTED LENS",
      tipo: "steel",
      tipo2: "",
      genero: "male",
      hp: "46",
      ataque: "65",
      defensa: "65",
      spattack: "55",
      spdefense: "35",
      speed: "34",
      sum: "300",
      largest: "65",
      hpb: "70.77",
      ataqueb: "100",
      defensab: "100",
      spattackb: "84.61",
      spdefenseb: "53.84",
      speedb: "52.3",
      e: "1",

      pokeImg:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/808.png",
    };
  },

  methods: {
    async cambiarPokemon() {
      const pokeNameInput = document.getElementById("pokeName");
      let pokeName = pokeNameInput.value;
      pokeName = pokeName.toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
      console.log(url);
      const res = await fetch(url).catch((e) => {
        console.log("Error: ", e.message);
      });
      const data = await res.json().catch((e) => {
        (this.nombre = "Incorrect name"),
          (this.e = ""),
          (this.pokeImg = "./descarga.jpg"),
          console.log("Error: ", e.message);
      });

      console.log(data);

      // const url2 = `https://pokeapi.co/api/v2/type/${this.tipo}`;
      // console.log(url2);
      // const res2 = await fetch(url2);
      // const data2 = await res2.json();

      // console.log(data2);
      // console.log(data2.damage_relations.double_damage_to[0].name);

      this.pokeImg = data.sprites.other["official-artwork"].front_default;
      this.nombre = data.name.toUpperCase();
      this.numero = data.id;
      this.tipo = data.types[0].type.name;
      if (data.types[1]) {
        this.tipo2 = data.types[1].type.name;
      } else {
        this.tipo2 = "";
      }
      this.habilidad = data.abilities[0].ability.name
        .replace("-", " ")
        .toUpperCase();
      if (data.abilities[1]) {
        this.habilidad2 = data.abilities[1].ability.name
          .replace("-", " ")
          .toUpperCase();
      }
      this.altura = data.height / 10;
      this.peso = data.weight / 10;
      this.e = "1";
      this.hp = data.stats[0].base_stat;
      this.ataque = data.stats[1].base_stat;
      this.defensa = data.stats[2].base_stat;
      this.spattack = data.stats[3].base_stat;
      this.spdefense = data.stats[4].base_stat;
      this.speed = data.stats[5].base_stat;
      this.sum =
        this.hp +
        this.ataque +
        this.defensa +
        this.spattack +
        this.spdefense +
        this.speed;
      let arr = [
        this.hp,
        this.ataque,
        this.defensa,
        this.spattack,
        this.spdefense,
        this.speed,
      ];
      this.largest = arr.sort((a, b) => a - b)[arr.length - 1];

      (this.hpb = (this.hp * 100) / this.largest),
        (this.ataqueb = (this.ataque * 100) / this.largest),
        (this.defensab = (this.defensa * 100) / this.largest),
        (this.spattackb = (this.spattack * 100) / this.largest),
        (this.spdefenseb = (this.spdefense * 100) / this.largest),
        (this.speedb = (this.speed * 100) / this.largest);
    },
  },
});

app.mount("#app");
