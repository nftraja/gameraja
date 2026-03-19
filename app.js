/* ================= DRAWER ================= */

function toggleDrawer(){
  document.getElementById("drawer").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
  document.body.classList.toggle("drawer-open");
}

function closeDrawer(){
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.classList.remove("drawer-open");
}


/* ================= CATEGORY CONFIG ================= */

const categoryData = {

  casual:{
    title:"🎮 Casual Games",
    desc:"Browser based instant play games with no installation required for quick entertainment and easy access gaming."
  },

  arcade:{
    title:"🕹 Arcade & Retro",
    desc:"Classic arcade style and retro games bringing nostalgic gameplay experiences with simple mechanics and timeless fun."
  },

  esports:{
    title:"⚔️ eSports",
    desc:"Competitive gaming platforms offering ranked matches, skill based challenges and multiplayer competitive experiences."
  },

  tournaments:{
    title:"🏆 Tournaments",
    desc:"Online gaming tournaments with leaderboards, competitions and prize based events for competitive players."
  },

  fantasy:{
    title:"💰 Fantasy Gaming",
    desc:"Fantasy sports platforms allowing users to create teams, compete in leagues and earn based on real match performance."
  },

  web3:{
    title:"⛓ Web3 Games",
    desc:"Blockchain powered games enabling decentralized ownership, play to earn mechanics and crypto based gaming ecosystems."
  },

  nft:{
    title:"🖼 NFT Games",
    desc:"Games integrated with NFT assets where players can own, trade and utilize unique digital collectibles within gameplay."
  },

  metaverse:{
    title:"🌐 Metaverse",
    desc:"Virtual worlds and immersive environments where users interact, play and explore digital spaces using avatars."
  },

  kids:{
    title:"🧒 Kids Safe Games",
    desc:"Safe and age appropriate games designed for children focusing on fun, learning and non harmful entertainment."
  },

  streaming:{
    title:"📺 Streaming",
    desc:"Gaming streaming platforms and communities where users watch live gameplay, connect with players and explore content."
  }

};


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if(!type || !categoryData[type]) return;

  // Set Title
  document.getElementById("categoryTitle").innerText = categoryData[type].title;
  document.getElementById("categoryDesc").innerText = categoryData[type].desc;
  document.getElementById("pageTitle").innerText = categoryData[type].title;

  loadPlatforms(type);
});


/* ================= LOAD JSON ================= */

async function loadPlatforms(type){

  try{

    const res = await fetch("platforms.json");
    const data = await res.json();

    const container = document.getElementById("platformContainer");

    container.innerHTML = "";

    const filtered = data.filter(item => item.category === type);

    if(filtered.length === 0){
      container.innerHTML = "<div class='glass-card'>No platforms available.</div>";
      return;
    }

    filtered.forEach(item => {

      const card = document.createElement("div");
      card.className = "list-card";

      card.innerHTML = `
        <div class="list-title">${item.name}</div>

        <div class="list-desc">
          ${item.description}
        </div>

        <a href="${item.url}" target="_blank" class="btn">
          Play Now →
        </a>
      `;

      container.appendChild(card);

    });

  }catch(err){
    console.error("Error loading JSON:", err);
  }

}