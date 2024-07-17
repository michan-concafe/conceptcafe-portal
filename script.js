document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    let articleFile = params.get('article');

    if (articleFile) {
        fetch(articleFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                const articleContent = document.getElementById('article-content');
                const doc = new DOMParser().parseFromString(html, 'text/html');

                // ページ名の表示を1回にする
                const titleElement = doc.querySelector('h2');
                if (titleElement) {
                    document.title = titleElement.textContent;
                    titleElement.remove();
                }
                articleContent.innerHTML = doc.body.innerHTML;
            })
            .catch(error => {
                console.error('Error loading article:', error);
                document.getElementById('article-content').textContent = '記事が読み込まれませんでした。';
            });
    }

    // タグリストのリンクにクリックイベントを追加
    const tagList = document.getElementById('tag-list');
    tagList.addEventListener('click', function(event) {
        event.preventDefault();

        // クリックされたタグのデータ属性を取得
        const tag = event.target.dataset.tag;
        if (!tag) return;

        // タグに対応する記事一覧を取得して表示
        fetch(`tag-${tag}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                const articleContent = document.getElementById('article-content');
                articleContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading tag page:', error);
                document.getElementById('article-content').textContent = '該当する記事が見つかりませんでした。';
            });
    });

    // 検索ボタンのクリックイベントを追加
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = document.getElementById('search-box').value.toLowerCase();
            fetch('articles.json')
                .then(response => response.json())
                .then(articles => {
                    const searchResults = document.getElementById('search-results');
                    searchResults.innerHTML = '';
                    articles.forEach(article => {
                        if (article.title.toLowerCase().includes(query) || article.content.toLowerCase().includes(query)) {
                            const li = document.createElement('li');
                            li.innerHTML = `
                                <a href="template.html?article=${article.file}">
                                    <h3>${article.title}</h3>
                                    <img src="${article.image}" alt="${article.title}" style="width: 100px; height: 100px;">
                                    <p>${article.content.substring(0, 100)}...</p>
                                </a>`;
                            searchResults.appendChild(li);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching articles:', error);
                });
        });
    }
    
    // タグチェックボックスの追加
    const tags = ['コンカフェ', '研修あり', '週1～OK', '交通費支給'];
    const tagCheckboxes = document.getElementById('tag-checkboxes');
    if (tagCheckboxes) {
        tags.forEach(tag => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `tag-${tag}`;
            checkbox.value = tag;

            const label = document.createElement('label');
            label.htmlFor = `tag-${tag}`;
            label.textContent = tag;

            tagCheckboxes.appendChild(checkbox);
            tagCheckboxes.appendChild(label);
            tagCheckboxes.appendChild(document.createElement('br'));
        });
    }
});
