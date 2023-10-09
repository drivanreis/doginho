import { useEffect, useState } from 'react';
// Testando css
import './App.css';

// Função para buscar a URL de uma imagem aleatória de cachorro
async function fetchImgUrl() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const image = await response.json();

    // Exibe o nome da raça do cachorro no alert
    alert(image.message.split('/')[4]);

    return image.message;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [dogImage, setDogImage] = useState('');

  // Função para buscar e atualizar a imagem do cachorro
  const fetchImg = async () => {
    setLoading(true);
    const imageUrl = await fetchImgUrl();
    setDogImage(imageUrl);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (localStorage.length === 0) {
      fetchImg();
    } else {
      setDogImage(localStorage.getItem('dogImage') as string);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Salva a URL da imagem no localStorage sempre que ela é atualizada
    localStorage.setItem('dogImage', dogImage);
  }, [dogImage]);

  if (loading) {
    return (
      // adicionar um spine
      <h1>Loading...</h1>
    );
  }

  return (
    <div>
      <h1>Doguinhos</h1>
      {/* Exibe a raça do cachorro na página */}
      <h2>
        { dogImage.split('/')[4].toUpperCase() }
      </h2>
      <button onClick={ fetchImg }>Novo doguinho!</button>
      <img src={ dogImage } alt="Doguinho aleatório" />
    </div>
  );
}

export default App;
