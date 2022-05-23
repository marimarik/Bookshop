let container = document.createElement('div');
document.body.append(container);

//Header
let header = document.createElement('header');
container.append(header);

let nav = document.createElement('nav');
header.append(nav);
nav.className = "navbar";

let ul = document.createElement('ul');
nav.append(ul);
ul.className = "navbar-texts";

let li1 = document.createElement('li');
ul.prepend(li1);
li1.className = "navbar-text";

let a1 = document.createElement('a');
li1.append(a1);
a1.title = "Book Catalog";
a1.href = "library.html";
a1.target = "_self";
a1.innerHTML = "Book Catalog";

let li2 = document.createElement('li');
ul.append(li2);
li2.className = "navbar-text";

let a2 = document.createElement('a');
li2.append(a2);
a2.title = "about-us";
a2.href = "library.html";
a2.innerHTML = "About Us";
a2.href = "#about-us";

let form = document.createElement('form');
nav.append(form);
form.className = "input-With-Icon";

let form_i = document.createElement('i');
form_i.className = "fas fa-search";
form.append(form_i);

let input = document.createElement('input');
form.append(input);
input.type = "text";
input.placeholder = "Search Books Here..";
input.id = "search";
input.alt = "search";
input.title = "search";

let order_button = document.createElement('button'); //order form
form.before(order_button);
order_button.type = "button";
order_button.className = "order";
order_button.title = "Order";

let order_a = document.createElement('a');
order_button.append(order_a);
order_a.title = "Book Catalog";
order_a.href = "Order.html";
order_a.target = "_self";

let button_i = document.createElement('i');
button_i.className = "fas fa-shopping-cart";
button_i.innerHTML = "Order";
order_button.append(button_i);

//Main
let main = document.createElement('main');
main.className = "book-cards";
container.append(main);

fetch('books.json') //path to the file with json data  
    .then(response => {
        return response.json();
    })
    .then(data => {
        let all_books = data;
        for (let i = 0; i < all_books.length; i++) {
            dataFunction(all_books[i], i);
        }

        function dataFunction(each_book, i) {
            let article = document.createElement('article');
            article.className = "book-card";
            main.append(article);

            let img = document.createElement('img');
            article.append(img);
            img.src = each_book.imageLink;

            let textInfo = document.createElement('div');
            textInfo.className = "text-info";
            article.append(textInfo);

            let author = document.createElement('h3');
            textInfo.append(author);
            author.innerHTML = each_book.author;

            let title = document.createElement('h3');
            textInfo.append(title);
            title.innerHTML = each_book.title;

            let price = document.createElement('h3');
            textInfo.append(price);
            price.innerHTML = each_book.price + "$";

            let button1 = document.createElement('button');
            button1.className = "show_more_btn";
            button1.id = "show_more_btn_" + i; 
            textInfo.append(button1);
            button1.innerHTML = "Show More";
            button1.onclick = showModal;

            let button2 = document.createElement('button');
            button2.className = "add_to_bag_btn"; 
            textInfo.append(button2);
            button2.innerHTML = "Add to bag";

       }

        function showModal() {
            let book_id = this.id.split('_')[3]

            let modal_book = all_books[book_id];

            let { author, description, imageLink, price, title } = modal_book;

            let modal_Fragment = new DocumentFragment();

            let modal_Wrapper = document.createElement("div");
            modal_Wrapper.className = "modal_wrapper";

            let modal = document.createElement("div");
            modal.className = "modal";

            let modal_Book_Img = document.createElement("img");
            modal_Book_Img.src = imageLink;
            modal_Book_Img.className = "modal_img";

            let modal_Text_Wrapper = document.createElement("div");
            modal_Text_Wrapper.className = "modal_text-wrapper";

            let close_Button = document.createElement("div");
            close_Button.innerHTML = "&times;";
            close_Button.className = "modal_close";
            close_Button.id = "closeModal";
            modal.append(close_Button);

            let modal_Book_Title = document.createElement("p");
            modal_Book_Title.className = "modal_title";
            modal_Book_Title.innerText = title;
            modal_Text_Wrapper.append(modal_Book_Title);

            let modal_Book_Author = document.createElement("p");
            modal_Book_Author.className = "modal_author";
            modal_Book_Author.innerText = author;
            modal_Text_Wrapper.append(modal_Book_Author);

            let modal_Book_Description = document.createElement("p");
            modal_Book_Description.className = "modal_description";
            modal_Book_Description.innerText = description;
            modal_Text_Wrapper.append(modal_Book_Description);

            let modal_Book_Price = document.createElement("p");
            modal_Book_Price.className = "mmodal_price";
            modal_Book_Price.innerText = `${price} €`;
            modal_Text_Wrapper.append(modal_Book_Price);

            modal.append(modal_Book_Img);
            modal.append(modal_Text_Wrapper);
            modal_Wrapper.append(modal);
            modal_Fragment.append(modal_Wrapper);
            document.body.append(modal_Fragment);

            document.querySelector(".modal_wrapper").classList.add("visible");
            document.querySelector(".modal_wrapper").addEventListener("click", closeModal.bind(this));
            document.body.style.overflow = "hidden";
            document.querySelector("#closeModal").addEventListener("click", closeModal);

        }

        function closeModal(e) {
            e.preventDefault();
            e.stopPropagation();

            let isWrapperClick = Array.from(e.target.classList).includes("modal_wrapper");
            let isclose_ButtonClick = Array.from(e.target.classList).includes("modal_close");

            if (!isWrapperClick && !isclose_ButtonClick) {
                return
            }

            if (isWrapperClick) {
                e.target.remove();
            }

            if (isclose_ButtonClick) {
                e.target.parentNode.parentNode.remove();
            }

            document.body.style.overflow = "visible";
        }

        // end of modal

    });

//Footer
let footer = document.createElement('footer');
footer.className = "footer";
container.append(footer);

let about_Info = document.createElement('div');
about_Info.className = "about-info";
footer.append(about_Info);

let footer_h1 = document.createElement('h1');
about_Info.append(footer_h1);
footer_h1.id = "about-us";
footer_h1.innerHTML = "About us";

let footer_p = document.createElement('p');
about_Info.append(footer_p);
footer_p.innerHTML = 'Welcome to the best online Library. We offer </br> users a different kind of services with the </br> different features and prices. You can order the </br> books and get them with delivery service.';

let footer_ul = document.createElement('ul');
footer.append(footer_ul);
footer_ul.className = "social-info";

let footer_li = document.createElement('li');
footer_ul.append(footer_li);

let footer_h2 = document.createElement('h2');
footer_li.append(footer_h2);
footer_h2.className = "contact";
footer_h2.innerHTML = "Social Handlers:";

let foot_ul = document.createElement('ul');
footer_li.append(foot_ul);
foot_ul.className = "one-box";

let foot_li1 = document.createElement('li');
foot_ul.prepend(foot_li1);

let foot_a1 = document.createElement('a');
foot_li1.append(foot_a1);
foot_a1.href = "#";
foot_a1.innerHTML = "Facebook";

let foot_li2 = document.createElement('li');
foot_li1.after(foot_li2);

let foot_a2 = document.createElement('a');
foot_li2.append(foot_a2);
foot_a2.href = "#";
foot_a2.innerHTML = "Twitter";

let foot_li3 = document.createElement('li');
foot_ul.append(foot_li3);

let foot_a3 = document.createElement('a');
foot_li3.append(foot_a3);
foot_a3.href = "#";
foot_a3.innerHTML = "Instagram";

let footer_li2 = document.createElement('li');
footer_ul.append(footer_li2);
footer_li2.className = "features";

let footer_h2_ = document.createElement('h2');
footer_li2.append(footer_h2_);
footer_h2_.className = "contact";
footer_h2_.innerHTML = "Contact Us:";

let foot_ul2 = document.createElement('ul');
footer_li2.append(foot_ul2);
foot_ul2.className = "one-box";

let foot_li4 = document.createElement('li');
foot_ul2.prepend(foot_li4);

let foot_a4 = document.createElement('a');
foot_li4.append(foot_a4);
foot_a4.href = "#";
foot_a4.innerHTML = "email@bookShop.com";
foot_a4.target = "_top";
foot_a4.href = "mailto:email@bookShop.com";
foot_a4.class = "footer-a";

let foot_li5 = document.createElement('li');
foot_li4.after(foot_li5);

let foot_a5 = document.createElement('a');
foot_li5.append(foot_a5);
foot_a5.href = "#";
foot_a5.innerHTML = "+13 784 598 84 13";
foot_a5.href = "tel:+13784598413";
foot_a5.class = "footer-a";

let footer_li3 = document.createElement('li');
footer_ul.append(footer_li3);

let footer_h2$ = document.createElement('h2');
footer_li3.append(footer_h2$);
footer_h2$.className = "contact";
footer_h2$.innerHTML = "Legal Part:";

let foot_ul3 = document.createElement('ul');
footer_li3.append(foot_ul3);
foot_ul3.className = "one-box";

let foot_li6 = document.createElement('li');
foot_ul3.prepend(foot_li6);

let foot_a6 = document.createElement('a');
foot_li6.append(foot_a6);
foot_a6.innerHTML = "Privacy Policy";
foot_a6.href = "#";

let foot_li7 = document.createElement('li');
foot_li6.after(foot_li7);

let foot_a7 = document.createElement('a');
foot_li7.append(foot_a7);
foot_a7.innerHTML = "Copytights";
foot_a7.href = "#";

let rights = document.createElement('div');
footer.append(rights);
rights.className = "rights-info";

let rights_p = document.createElement('p');
rights.append(rights_p);
rights_p.innerHTML = "All rights reserved © Online Library 2022";


