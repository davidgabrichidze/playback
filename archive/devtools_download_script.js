/**
 * ============================================================
 * 🎭 ქართული ფლეიბექ თეატრის სურათების ჩამოტვირთვა
 *    DevTools Console Script
 * ============================================================
 *
 * ინსტრუქცია:
 * 1. გახსენი საიტი: https://sites.google.com/view/georgianplayback/home
 * 2. გახსენი ყველა ჩაშლადი სექცია (დააკლიკე ყველას)
 * 3. დასქროლე ბოლოში რომ ყველა სურათი ჩაიტვირთოს
 * 4. გახსენი DevTools: Cmd+Option+J (Mac) ან F12 (Windows)
 * 5. Console ტაბში ჩააკოპირე და გაუშვი ეს მთლიანი სკრიპტი
 * 6. დაელოდე — სურათები ჩამოიტვირთება ავტომატურად
 * ============================================================
 */

(async function downloadAllImages() {
  console.log('🎭 იწყება სურათების ჩამოტვირთვა...');

  // 1. ვიპოვოთ ყველა კონტენტ-სურათი
  const imgs = [...document.querySelectorAll('img')].filter(img =>
    img.src &&
    img.src.includes('googleusercontent.com') &&
    !img.src.includes('gstatic') &&
    img.naturalWidth > 50
  );

  console.log(`📸 ნაპოვნია ${imgs.length} სურათი`);

  if (imgs.length === 0) {
    console.error('❌ სურათები ვერ მოიძებნა! გახსენი ყველა სექცია და დასქროლე ბოლოში.');
    return;
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const filename = `playback_img_${String(i + 1).padStart(2, '0')}.jpg`;

    try {
      // მეთოდი 1: პირდაპირ URL-ზე fetch (DevTools-ს აქვს უფლება)
      const response = await fetch(img.src, {
        credentials: 'include',
        mode: 'cors'
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 100) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          success++;
          console.log(`  ✅ [${i + 1}/${imgs.length}] ${filename} — ${(blob.size / 1024).toFixed(0)} KB`);
        } else {
          throw new Error('Empty blob');
        }
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (fetchErr) {
      // მეთოდი 2: თუ fetch ვერ მოხერხდა, ვცადოთ XMLHttpRequest
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', img.src, true);
          xhr.responseType = 'blob';
          xhr.withCredentials = true;
          xhr.onload = () => {
            if (xhr.status === 200 && xhr.response.size > 100) {
              resolve(xhr.response);
            } else {
              reject(new Error(`XHR status: ${xhr.status}, size: ${xhr.response?.size}`));
            }
          };
          xhr.onerror = () => reject(new Error('XHR error'));
          xhr.send();
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        success++;
        console.log(`  ✅ [${i + 1}/${imgs.length}] ${filename} — ${(blob.size / 1024).toFixed(0)} KB (XHR)`);
      } catch (xhrErr) {
        // მეთოდი 3: ბოლო ცდა — გახსნა ახალ ტაბში
        console.warn(`  ⚠️ [${i + 1}/${imgs.length}] fetch/XHR ვერ მოხერხდა, ვხსნი ახალ ტაბში...`);
        window.open(img.src, '_blank');
        failed++;
      }
    }

    // 10 წამიანი პაუზა ყოველ ჩამოტვირთვას შორის
    if (i < imgs.length - 1) {
      console.log(`  ⏳ ველოდები 10 წამს...`);
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  console.log('');
  console.log('============================================================');
  console.log(`📊 შედეგი: ✅ ${success} ჩამოტვირთული, ❌ ${failed} ვერ მოხერხდა`);
  console.log('============================================================');
})();
