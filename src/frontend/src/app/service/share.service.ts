import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private storageKey = 'blog_';
  private blogsCache: { title: string, content: string }[] = [];
  private MainblogsCache: { title: string, content: string }[] = [];

  // private Users: any [] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.loadBlogs();
    // this.loadBlogsArch();

  }

  private loadBlogs() {
    this.MainblogsCache = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.storageKey)) {
        const blog = JSON.parse(localStorage.getItem(key) || '{}');
        this.MainblogsCache.push(blog);
      }
    }
  }

  setBlogData(title: string, content: string) {
    if (!title.trim() || !content.trim()) {
      console.log('Не можна додавати блог з порожніми полями');
      return;
    }

    const timestamp = new Date().getTime(); // Генеруємо унікальний ідентифікатор
    const newBlog = { title, content };

    // Зберігаємо блог під окремим ключем
    localStorage.setItem(`${this.storageKey}${timestamp}`, JSON.stringify(newBlog));

    // Оновлюємо локальну копію даних
    this.blogsCache.push(newBlog);
    this.MainblogsCache = this.blogsCache;
    console.log('Блог додано:', newBlog);
  }

  getBlogData() {
    // Перевіряємо, чи змінилося щось у localStorage
    this.loadBlogs();

    return this.MainblogsCache;
  }

}
