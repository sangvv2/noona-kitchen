document.addEventListener("DOMContentLoaded", function() {
    // 전체 메뉴를 클릭하면 모든 카드를 보이게 설정
    const allMenu = document.querySelector('[data-category="all"]');
    const cards = document.querySelectorAll('.card');
    
    allMenu.addEventListener("click", function() {
      // 모든 카드 보여주기
      cards.forEach(card => {
        card.style.display = "block";
      });
    });
  
    // 각 카테고리 메뉴 클릭 시 해당 카테고리에 맞는 카드만 보이게
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
      item.addEventListener("click", function(event) {
        const category = item.getAttribute('data-category');
        
        cards.forEach(card => {
          if (category === "all" || card.getAttribute('data-category') === category) {
            card.style.display = "block"; // 해당 카테고리 카드 보이기
          } else {
            card.style.display = "none"; // 나머지 카드 숨기기
          }
        });
        
        event.preventDefault();
      });
    });
  });



  
// 카드를 정렬하는 함수
function sortCards(sortType) {
  const cards = document.querySelectorAll('.card'); // .card 요소를 모두 선택
  const sortedCards = Array.from(cards).sort((a, b) => {
    const latestA = Number(a.dataset.latest); 
    const latestB = Number(b.dataset.latest); 
    const viewsA = Number(a.dataset.views); 
    const viewsB = Number(b.dataset.views); 

    if (sortType === "latest") {
      return latestB - latestA; // 최신순 
    } else if (sortType === "views") {
      return viewsB - viewsA; // 조회순 
    }
  });

  const container = document.querySelector(".food-container");
  container.innerHTML = ""; // 기존 카드를 초기화
  sortedCards.forEach(card => container.appendChild(card)); // 정렬된 카드 추가
}

// 최신순, 조회순 왼쪽에 체크 아이콘
document.querySelectorAll(".food-txt-right a").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 방지
    
    const sortType = event.target.dataset.sort; // 클릭한 링크의 data-sort 값을 가져옴

    // 클릭된 링크에 active 클래스 추가 및 다른 링크에서 active 클래스 제거
    document.querySelectorAll(".food-txt-right a").forEach(a => a.classList.remove("active"));
    event.target.classList.add("active");

    sortCards(sortType); // 카드 정렬 함수 호출
  });
});