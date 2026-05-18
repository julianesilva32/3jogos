window.onload = function () {
  const emojis = ['🥰','🥺','😂','😴','😇','😜','😡','😆','😇','🥺','😂','😴','🥰','😜','😡','😆'];
  function atualizarTentativas() {
  }

  atualizarTentativas();

  let shuf_emojis = emojis.sort(() => Math.random() > 0.5 ? 1 : -1);

  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuf_emojis[i];

    document.querySelector('.game').appendChild(box);

    box.onclick = function () {
      this.classList.add('boxOpen');

      setTimeout(() => {
        const boxOpen = document.querySelectorAll('.boxOpen');
        if (boxOpen.length > 1) {
          if (boxOpen[0].innerHTML === boxOpen[1].innerHTML) {
            boxOpen[0].classList.add('boxMatch');
            boxOpen[1].classList.add('boxMatch');
          }
          boxOpen[0].classList.remove('boxOpen');
          boxOpen[1].classList.remove('boxOpen');

          if (document.querySelectorAll('.boxMatch').length === emojis.length) {
            document.querySelector('.mensagem').style.display = 'inline';
            document.getElementById('botao').style.display = 'inline';
          }
        } else {
          tentativas--;
          atualizarTentativas();
        }

        if (tentativas === 0) {
          alert("Fim de jogo! Suas tentativas acabaram.");
          document.querySelectorAll('.item').forEach(item => item.onclick = null);
        }
      }, 500);
    };
  }
};