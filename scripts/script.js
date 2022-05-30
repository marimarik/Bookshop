let container = document.createElement("div");
document.body.append(container);

//Header
let header = document.createElement('header');
container.append(header);

let nav = document.createElement('nav');
nav.className = "navbar";
header.append(nav);

let ul = document.createElement('ul');
ul.className = "navbar-texts";
nav.append(ul);

let li1 = document.createElement('li');
li1.className = "navbar-text";
ul.prepend(li1);

let a1 = document.createElement('a');
a1.title = "Book Catalog";
a1.href = "index.html";
a1.target = "_self";
a1.innerHTML = "Book Catalog";
li1.append(a1);

let li2 = document.createElement('li');
li2.className = "navbar-text";
ul.append(li2);

let a2 = document.createElement('a');
a2.title = "about-us";
a2.innerHTML = "About Us";
a2.href = "#about-us";
li2.append(a2);

let form = document.createElement('form');
form.className = "input-With-Icon";
nav.append(form);

let form_i = document.createElement('i');
form_i.className = "fas fa-search";
form.append(form_i);

let input = document.createElement('input');
input.type = "text";
input.placeholder = "Search Books Here..";
input.id = "search";
input.alt = "search";
input.title = "search";
form.append(input);

//Order 
let order_button = document.createElement('button');
order_button.type = "button";
order_button.className = "order";
order_button.id = "myBtn";
order_button.title = "Order";
form.before(order_button);

let order_a = document.createElement('a');
order_button.append(order_a);
order_a.target = "#";

let button_i = document.createElement('i');
button_i.className = "fas fa-shopping-cart";
order_button.append(button_i);

let order_span1 = document.createElement('span');
order_span1.innerText = "Order(";
button_i.append(order_span1);

let order_span2 = document.createElement('span');
order_span2.innerText = "0";
order_span2.id = "order_span";
button_i.append(order_span2);

let order_span3 = document.createElement('span');
order_span3.innerText = ")";
button_i.append(order_span3);

//The Modal
let myModal = document.createElement("div");
myModal.className = "modal1";
myModal.id = "myModal";
container.append(myModal);

let modalContent = document.createElement("div");
modalContent.className = "modal-content";
myModal.append(modalContent);

let modalHeader = document.createElement("div");
modalHeader.className = "modal-header";
modalContent.append(modalHeader);

let modalClose = document.createElement("span");
modalClose.className = "close";
modalClose.innerHTML = "&times;";
modalHeader.append(modalClose);

let modalh2 = document.createElement("h2");
modalh2.innerHTML = "Shopping Cart Summary: ";
modalHeader.append(modalh2);
let modalsumspan = document.createElement("span");
modalsumspan.id = "modal_sum_span";
modalsumspan.innerText = "0";
modalh2.append(modalsumspan);
let modalusdspan = document.createElement("span");
modalusdspan.innerText = "$";
modalh2.append(modalusdspan);

let modalBody = document.createElement("div");
modalBody.className = "modal-body";
modalContent.append(modalBody);

let modalFooter = document.createElement("div");
modalFooter.className = "modal-footer";
modalContent.append(modalFooter);

let modalFooterBtn = document.createElement("a");
modalFooterBtn.innerText = "Confirm Order";
modalFooter.append(modalFooterBtn);
modalFooterBtn.className = "modalFooterBtn";
modalFooterBtn.href = "formpage/form.html";
modalFooterBtn.target = "_blank";


var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
            button1.id = "show_more_btn_" + i; //Show more button
            textInfo.append(button1);
            button1.innerHTML = "Show More";
            button1.onclick = showModal;

            let button2 = document.createElement('button');
            button2.className = "add_to_bag_btn";
            button2.id = "add_to_bag_btn_" + i; //Add to bag button
            textInfo.append(button2);
            button2.innerHTML = "Add to bag";
            button2.onclick = addToOrders;

        }
        function addToOrders() {
            let book_id = this.id.split('_')[4];
            let order_book = all_books[book_id];
            let { author, price, title } = order_book;
            let books_counter = document.getElementById('order_span');
            let added_book_counter = parseInt(books_counter.innerText) + 1;
            books_counter.innerText = added_book_counter; //add num to bag
            let add_to_order = document.getElementsByClassName("modal-body")[0];
            let add_order_book = document.createElement('p');
            add_order_book.className = price;
            add_to_order.append(add_order_book);
            add_order_book.innerHTML = `<strong>${author}</strong> | ${title} | <strong>${price}$</strong> - <strong><span class="remove_book_from_order">[x]</span></strong>`;
            let each_order_book_close = document.getElementsByClassName("remove_book_from_order");
            for (i = 0; i < each_order_book_close.length; i++) {
                each_order_book_close[i].onclick = removePriceFromOrder;
            }
            let modal_sum_span = document.getElementById("modal_sum_span");
            let total_price_in_order = parseInt(modal_sum_span.innerText);
            modal_sum_span.innerText = total_price_in_order + price;
        }

        function removePriceFromOrder() {
            let books_counter = document.getElementById('order_span');
            let removed_book_counter = parseInt(books_counter.innerText) - 1;
            books_counter.innerText = removed_book_counter; //add num to bag
            let modal_sum_span = document.getElementById("modal_sum_span");
            let total_price_in_order = parseInt(modal_sum_span.innerText);
            let price_to_remove = this.parentNode.parentNode.className;
            modal_sum_span.innerText = total_price_in_order - price_to_remove;
            this.parentNode.parentNode.remove();
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
