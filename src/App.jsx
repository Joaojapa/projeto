import { useState } from 'react';
import './App.css';

// Definição das perguntas e respostas
const questions = [
  {
    question: 'Qual das seguintes opções NÃO é uma linguagem de marcação?',
    type: 'multiple-choice', // Tipo de pergunta
    options: [
      { label: 'a) HTML', value: 'HTML' },
      { label: 'b) XML', value: 'XML' },
      { label: 'c) CSS', value: 'CSS' },
      { label: 'd) Markdown', value: 'Markdown' }
    ],
    answer: 'CSS',
    feedback: {
      HTML: 'HTML é uma linguagem de marcação usada para estruturar o conteúdo de uma página web.',
      XML: 'XML é uma linguagem de marcação que define regras para a formatação de documentos.',
      CSS: 'CSS (Cascading Style Sheets) não é uma linguagem de marcação; é uma linguagem de estilo usada para definir a aparência de elementos HTML.',
      Markdown: 'Markdown é uma linguagem de marcação usada para formatar texto simples, frequentemente usada em README files.'
    }
  },
  {
    question: 'Qual das seguintes opções é usada para adicionar interatividade a uma página web?',
    type: 'multiple-choice',
    options: [
      { label: 'a) HTML', value: 'HTML' },
      { label: 'b) CSS', value: 'CSS' },
      { label: 'c) JavaScript', value: 'JavaScript' },
      { label: 'd) SQL', value: 'SQL' }
    ],
    answer: 'JavaScript',
    feedback: {
      HTML: 'HTML é usado para estruturar o conteúdo, mas não para adicionar interatividade.',
      CSS: 'CSS é usado para estilizar a apresentação, mas não adiciona interatividade.',
      JavaScript: 'JavaScript é a linguagem usada para adicionar interatividade e comportamento dinâmico às páginas web.',
      SQL: 'SQL é usada para gerenciar dados em bancos de dados e não está diretamente relacionada ao frontend.'
    }
  },
  {
    question: 'A tag <a> é usada para criar links em uma página HTML.',
    type: 'true-false', // Tipo de pergunta
    options: [
      { label: 'a) Verdadeiro', value: 'Verdadeiro' },
      { label: 'b) Falso', value: 'Falso' }
    ],
    answer: 'Verdadeiro',
    feedback: {
      Verdadeiro: 'Correto! A tag <a> é usada para criar hyperlinks em HTML.',
      Falso: 'Incorreto. A tag <a> é de fato usada para criar hyperlinks.'
    }
  },
  {
    question: 'CSS é uma linguagem de programação.',
    type: 'true-false',
    options: [
      { label: 'a) Verdadeiro', value: 'Verdadeiro' },
      { label: 'b) Falso', value: 'Falso' }
    ],
    answer: 'Falso',
    feedback: {
      Verdadeiro: 'Incorreto. CSS é uma linguagem de estilo, não uma linguagem de programação.',
      Falso: 'Correto! CSS é usada para definir o estilo de documentos HTML, não para programação.'
    }
  },
  {
    question: 'Qual tag HTML é usada para adicionar um link em uma página web?',
    type: 'multiple-choice',
    options: [
      { label: 'a) <div>', value: '<div>' },
      { label: 'b) <link>', value: '<link>' },
      { label: 'c) <a>', value: '<a>' },
      { label: 'd) <href>', value: '<href>' }
    ],
    answer: '<a>',
    feedback: {
      '<div>': 'A tag <div> é usada para criar contêineres e não para adicionar links.',
      '<link>': 'A tag <link> é usada para vincular documentos externos, como folhas de estilo CSS.',
      '<a>': 'A tag <a> (anchor) é usada para criar hyperlinks em HTML, permitindo a navegação para outras páginas ou seções da mesma página.',
      '<href>': 'O atributo href é usado dentro da tag <a> para definir o destino do link, não é uma tag HTML.'
    }
  },
  {
    question: 'Qual propriedade CSS é usada para alterar a cor de fundo de um elemento?',
    type: 'multiple-choice',
    options: [
      { label: 'a) color', value: 'color' },
      { label: 'b) background-color', value: 'background-color' },
      { label: 'c) border-color', value: 'border-color' },
      { label: 'd) font-color', value: 'font-color' }
    ],
    answer: 'background-color',
    feedback: {
      'color': 'A propriedade color altera a cor do texto, não a cor de fundo.',
      'background-color': 'A propriedade background-color define a cor de fundo de um elemento.',
      'border-color': 'A propriedade border-color altera a cor da borda do elemento, não o fundo.',
      'font-color': 'font-color não é uma propriedade válida em CSS.'
    }
  },
  {
    question: 'Qual das seguintes técnicas é usada para melhorar o desempenho de uma página web ao carregar imagens?',
    type: 'multiple-choice',
    options: [
      { label: 'a) Usar imagens em alta resolução', value: 'Usar imagens em alta resolução' },
      { label: 'b) Carregar todas as imagens imediatamente', value: 'Carregar todas as imagens imediatamente' },
      { label: 'c) Utilizar lazy loading', value: 'Utilizar lazy loading' },
      { label: 'd) Incorporar imagens no código HTML', value: 'Incorporar imagens no código HTML' }
    ],
    answer: 'Utilizar lazy loading',
    feedback: {
      'Usar imagens em alta resolução': 'Imagens em alta resolução podem aumentar o tempo de carregamento da página.',
      'Carregar todas as imagens imediatamente': 'Carregar todas as imagens de uma vez pode resultar em tempos de carregamento mais longos e maior uso de largura de banda.',
      'Utilizar lazy loading': 'Lazy loading carrega imagens apenas quando são necessárias, melhorando o tempo de carregamento inicial da página.',
      'Incorporar imagens no código HTML': 'Incorporar imagens no código HTML não afeta diretamente o desempenho de carregamento.'
    }
  }
];

function App() {
  const [name, setName] = useState('');
  const [registration, setRegistration] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    const currentQuestion = questions[currentQuestionIndex];
    if (value) {
      if (value === currentQuestion.answer) {
        setFeedback('Resposta correta! ' + currentQuestion.feedback[value]);
      } else {
        setFeedback('Resposta incorreta! ' + currentQuestion.feedback[value] + ' A resposta correta é ' + currentQuestion.answer + ': ' + currentQuestion.feedback[currentQuestion.answer]);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption('');
    setFeedback('');
  };

  const handleStartQuestionnaire = () => {
    if (name && registration) {
      setShowQuestionnaire(true);
    } else {
      alert('Por favor, preencha seu nome e matrícula.');
    }
  };

  const handleReset = () => {
    setName('');
    setRegistration('');
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setFeedback('');
    setShowQuestionnaire(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      {!showQuestionnaire ? (
        <div className="user-info">
          <h1>Formulário de Usuário</h1>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Matrícula"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
          />
          <button onClick={handleStartQuestionnaire} className="start-button">
            Iniciar Questionário
          </button>
        </div>
      ) : (
        <div className="questionnaire">
          <h1>Questionário</h1>
          <div className="question-card">
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="option-item">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="question"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option-${index}`}>{option.label}</label>
                </div>
              ))}
            </div>
            {feedback && (
              <p className={`feedback ${selectedOption === currentQuestion.answer ? 'correct' : 'incorrect'}`}>
                {feedback}
              </p>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button onClick={handleNextQuestion} className="next-button">
                Próxima pergunta
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button onClick={handleReset} className="reset-button">
                Reiniciar Questionário
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
