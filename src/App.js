import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [produto, setProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'sucesso' ou 'erro'

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: produto.nome,
          preco: parseFloat(produto.preco),
          quantidade: parseInt(produto.quantidade),
        }),
      });

      const texto = await response.text();

      if (!response.ok) {
        setTipoMensagem('erro');
        setMensagem(texto);
      } else {
        setTipoMensagem('sucesso');
        setMensagem(texto);
        setProduto({ nome: '', preco: '', quantidade: '' });
        fetchProdutos();
      }
    } catch (error) {
      setTipoMensagem('erro');
      setMensagem('Erro ao conectar com o servidor.');
    }

    // Limpa a mensagem após 5 segundos
    setTimeout(() => {
      setMensagem('');
      setTipoMensagem('');
    }, 5000);
  };

  const fetchProdutos = async () => {
    const response = await fetch('http://localhost:3000/produtos');
    const data = await response.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="container">
      <h1 style={{ color: 'black' }}>Whatsapp</h1>
      <img src="/OIP (2).jpg" alt="Whatsapp" width="200" />

      {/* Música */}
      <h2>WHATSAPP MÚSICA!</h2>
<div className="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/xL75Hx_UudA?si=gvA5Wh218CWnVFQu"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>

<section className="homenagem-pai">
  <h2>Em memória do meu pai, José Luiz</h2>
  <img src="/pai.jpeg" alt="Foto do meu pai José Luiz" className="foto-pai" />
  <p>
    Meu velho, sua força e exemplo são a base de tudo que sou.  
    Mesmo ausente fisicamente, sinto você sempre comigo, guiando meus passos e inspirando minha caminhada.
  </p>
  <p className="data-homenagem">O maior marinheiro de todos os tempos.</p>
</section>

<section className="musica-whatsapp">
  <h2>KUNG FU, VOCÊ CONHECE O WHATSAPP?</h2>
  <iframe
    width="300"
    height="180"
    src="https://www.youtube.com/embed/rqiv3lL_qnI?si=r34C2v91zGRge3u-"
    title="Kung Fu WhatsApp"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</section>

<button onClick={() => alert('Você caiu no golpe do Ramon kkkkk')}>
  Abrir WhatsApp Web
</button>


      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required />
        <input name="preco" type="number" placeholder="Número" value={produto.preco} onChange={handleChange} step="0.01" required />
        <input name="quantidade" type="number" placeholder="Código SMS" value={produto.quantidade} onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>

      <h2>Contatos</h2>
      <ul>
        {produtos.map((p, index) => (
          <li key={index}>{p.nome} - R$ {p.preco.toFixed(2)} - Agência: {p.quantidade}</li>
        ))}
      </ul>

      {/* Créditos */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p>
          Criado por <a href="https://www.instagram.com/ramonzbjj/" target="_blank" rel="noopener noreferrer">@ramonzbjj</a>
        </p>
        <p>
          Professor: <a href="https://www.youtube.com/@vitorhugo_as" target="_blank" rel="noopener noreferrer">Vitor Hugo</a>
        </p>
      </div>
    </div>
  );
}

export default App;
