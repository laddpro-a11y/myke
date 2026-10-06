/**
 * MYKE AI Web - Chatbot Complet
 * Interface de chat interactif avec toutes les fonctionnalités
 */

export default class Chatbot {
  constructor() {
    this.state = {
      messages: [],  // Tableau de messages [ {role, content, id, time} ]
      input: '',     // Texte saisi par l'utilisateur
      isLoading: false,  // Indique si MYKE est en train de répondre
      isConnected: true,  // Statut de connexion au backend
      currentConversation: null,  // Conversation en cours
      conversations: [],  // Liste de toutes les conversations
      selectedConversationId: null  // ID de la conversation sélectionnée
    };
    this.init();
  }

  async init() {
    // Charger les conversations existantes depuis le backend
    await this.loadConversations();
    this.render();
    this.addEventListeners();
    // Ajouter un message de bienvenue si c'est une nouvelle conversation
    if (this.state.messages.length === 0) {
      this.addMessage('assistant', "Bonjour ! Je m'appelle MYKE. Comment puis-je vous aider aujourd'hui ?", true);
    }
  }

  // Charger les conversations depuis l'API backend
  async loadConversations() {
    try {
      const response = await fetch('/api/conversations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'  // Pour les cookies de session
      });
      
      if (response.ok) {
        const data = await response.json();
        this.state.conversations = data.conversations || [];
        this.renderConversationList();
      } else {
        console.error('Erreur chargement conversations');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  }

  // Enregistrer la conversation actuelle
  async saveCurrentConversation() {
    if (!this.state.currentConversationId || !this.state.messages.length) return;
    
    const conversationData = {
      title: this.state.messages[0]?.content ? 
        this.state.messages[0].content.substring(0, 30) + (this.state.messages[0].content.length > 30 ? '...' : '') : 'Nouvelle conversation',
      messages: this.state.messages,
      userId: this.getUserId()
    };
    
    try {
      await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversationData),
        credentials: 'include'
      });
    } catch (error) {
      console.error('Erreur sauvegarde conversation:', error);
    }
  }

  // Obtenir l'ID utilisateur depuis le cookie/session
  getUserId() {
    // À implémenter selon votre système d'authentification
    return 'user_' + Date.now();
  }

  // Ajouter un message à l'état
  addMessage(role, content, isSystem = false) {
    const message = {
      id: Date.now() + Math.random(),
      role: role,
      content: content,
      time: new Date().toLocaleTimeString(),
      isSystem: isSystem
    };
    
    this.state.messages.push(message);
    this.render();
    
    // Auto-scroll vers le bas
    this.scrollToBottom();
  }

  // Supprimer un message
  deleteMessage(messageId) {
    this.state.messages = this.state.messages.filter(m => m.id !== messageId);
    this.render();
  }

  // Modifier un message
  editMessage(messageId, newContent) {
    const message = this.state.messages.find(m => m.id === messageId);
    if (message) {
      message.content = newContent;
      this.render();
    }
  }

  // Basculer le statut de chargement
  setLoading(isLoading) {
    this.state.isLoading = isLoading;
    this.render();
  }

  // Basculer la connexion
  setConnected(isConnected) {
    this.state.isConnected = isConnected;
    this.render();
  }

  // Faire défiler vers le bas automatiquement
  scrollToBottom() {
    const container = document.getElementById('chatbot-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  // Rendu du composant chatbot
  render() {
    const { messages, input, isLoading, isConnected, currentConversation } = this.state;
    
    // Construction HTML du chatbot
    const messageElements = messages.map((msg, index) => this.renderMessage(msg, index)).join('');
    
    // Boutots d'action
    const actionButtons = isConnected ? `
      <div className="chatbot-actions">
        <button className="btn-secondary" onclick="chatbot.newConversation()">Nouvelle conversation</button>
        <button className="btn-secondary" onclick="chatbot.exportConversation()">Exporter</button>
      </div>
    ` : `
      <div className="chatbot-actions">
        <button className="btn-primary" onclick="chatbot.login()">Se connecter</button>
      </div>
    `;

    return `
      <div className="myke-chatbot-wrapper">
        <!-- En-tête du chatbot -->
        <div className="myke-chatbot-header">
          <div className="myke-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-12S17.52 2 12 2zm0 16c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm.95 6.05-1.42 1.42a2.25 2.25 0 0 1-3.18 0l-1.06-1.06a2.25 2.25 0 0 1 0-3.18l1.42-1.42a2.25 2.25 0 0 1 3.18 0l1.06 1.06a2.25 2.25 0 0 1-3.18 0z"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
            </svg>
            <span>MYKE AI</span>
          </div>
          <span className="myke-slogan">"Your ideas. AI takes care of the rest."</span>
          <button className="myke-header-btn" onclick="chatbot.minimize()">▲</button>
        </div>

        <!-- Zone de messages -->
        <div className="myke-messages-area" id="chatbot-container">
          ${isLoading ? `
            <div className="myke-message myke-message-assistant">
              <div className="myke-avatar">MYKE</div>
              <div className="myke-message-content">
                <div className="myke-typing-indicator">
                  <div className="myke-typing-dot"></div>
                  <div className="myke-typing-dot"></div>
                  <div className="myke-typing-dot"></div>
                </div>
                En train de réfléchir...
              </div>
            </div>
          ` : ''}
          ${messageElements}
        </div>

        <!-- Zone d'entrée -->
        <div className="myke-input-area">
          <div className="myke-input-container">
            <textarea
              id="myke-input"
              placeholder="Écrivez à MYKE..."
              rows={1}
              maxlength={1000}
              oninput="chatbot.handleInputChange(event)"
              onkeydown="chatbot.handleKeyDown(event)"
              autoFocus
              disabled={!isConnected}
              className="myke-input-field"
              value={input}
              >
              ${input}
            </textarea>
            <div className="myke-input-buttons">
              <button className="myke-btn-send" onclick="chatbot.send()" disabled={!input.trim() || isLoading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 12 20 18"/>
                </svg>
                <span className="send-spinner" id="send-spinner" style="display: none;"></svg>
              </button>
              <button className="myke-btn-voice" onclick="chatbot.toggleVoice()" title="Voice input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4m0 3v4m0 2v4m2-5h.01"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      ${actionButtons}
    `;
  }

  // Rendu d'un message individuel
  renderMessage(msg, index) {
    const isUser = msg.role === 'user';
    const isSystem = msg.role === 'system';
    const time = msg.time || new Date().toLocaleTimeString();
    const avatar = isUser ? 'U' : (msg.isSystem ? 'MYKE' : 'U');
    
    // Formatter le contenu - simples marquages markdown
    let content = msg.content;
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\/(.*?)\//g, '<em>$1</em>');
    content = content.replace(/\`(.*?)\`/g, '<code>$1</code>');

    return `
      <div className="myke-message ${isUser ? 'myke-message-user' : 'myke-message-assistant'}" style="animation: messageIn ${index * 20}ms">
        <div className="myke-message-header">
          <span className="myke-avatar">${avatar}</span>
          <span className="myke-message-time">${time}</span>
        </div>
        <div className="myke-message-content">${content}</div>
      </div>
    `;
  }

  // Gestionnaire de changement d'input
  handleInputChange(event) {
    this.state = { ...this.state, input: event.target.value };
    this.render();
    const sendBtn = document.querySelector('.myke-btn-send');
    if (sendBtn) {
      sendBtn.disabled = !event.target.value.trim();
    }
  }

  // Gestionnaire de touche clavier
  handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  // Envoyer le message à MYKE
  async send() {
    const textarea = document.getElementById('myke-input');
    const content = textarea.value.trim();

    if (!content) return;

    // Ajouter le message utilisateur immédiatement
    this.addMessage('user', content);
    textarea.value = '';
    document.querySelector('.myke-btn-send').disabled = true;
    document.getElementById('send-spinner').style.display = 'block';

    try {
      // Envoyer au backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationId: this.state.currentConversationId,
          model: 'MYKE GPT V1',
          temperature: 0.7,
          maxTokens: 1024
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        // Ajouter la réponse de MYKE
        if (data.content) {
          this.addMessage('assistant', data.content);
        }
        // Gérer les tool calls si nécessaire
        if (data.toolCalls && data.toolCalls.length > 0) {
          this.handleToolCalls(data.toolCalls);
        }
      } else {
        // Erreur de connexion
        this.addMessage('assistant', "Désolé, MYKE ne peut pas répondre pour le moment. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur envoi:', error);
      this.addMessage('assistant', "Désolé, une erreur est survenue. Veuillez réessayer.");
    } finally {
      textarea.value = '';
      document.querySelector('.myke-btn-send').disabled = false;
      document.getElementById('send-spinner').style.display = 'none';
    }
  }

  // Gérer les appels d'outils
  handleToolCalls(toolCalls) {
    // Afficher les résultats des tools dans le chat
    const toolResults = toolCalls.map(tc => `
      <div className="myke-tool-result">
        <strong>Tool:</strong> ${tC.tool}<br>
        <strong>Result:</strong> ${tC.result || 'No result'}
      </div>
    `).join('');
    
    this.addMessage('system', `Outils utilisés : ${toolResults}`);
  }

  // Créer une nouvelle conversation
  newConversation() {
    this.state = {
      ...this.state,
      messages: [],
      currentConversationId: Date.now().toString(),
      conversations: [...this.state.conversations, {
        id: Date.now().toString(),
        title: 'Nouvelle conversation',
        createdAt: new Date()
      }]
    };
    this.render();
  }

  // Exporter la conversation
  exportConversation() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.messages));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.href = dataStr;
    downloadAnchorNode.download = "myke_conversation.json";
    downloadAnchorNode.click();
  }

  // Minimiser/maximiser le chatbot
  minimize() {
    const wrapper = document.querySelector('.myke-chatbot-wrapper');
    if (wrapper) {
      wrapper.style.display = wrapper.style.display === 'none' ? 'block' : 'none';
    }
  }

  // Ajouter les écouteurs d'événements
  addEventListeners() {
    // Envoi avec la touche Enter
    document.getElementById('myke-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    });

    // Envoyer quand on clique sur le bouton
    document.getElementById('myke-btn-send')?.addEventListener('click', () => this.send());

    // Gestion de la fenêtre
    document.querySelector('.myke-header-btn')?.addEventListener('click', () => this.minimize());
  }
}

// Initialiser le chatbot au chargement
document.addEventListener('DOMContentLoaded', () => {
  window.chatbot = new Chatbot();
});