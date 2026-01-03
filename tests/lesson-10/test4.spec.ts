import { test, expect } from "@playwright/test";
import { PersonalNotePage } from "./page/01-pom.ts";

test.describe("Exercise 4: Personal Notes", () => {
    test("Personal Notes", async ({ page }) => {
        const personalNotePage = new PersonalNotePage(page);

        // Truy cập trang https://material.playwrightvn.com/, click vào “Bài học 4: Personal notes"
        personalNotePage.openMaterialPage();
        personalNotePage.goToPage(personalNotePage.xpathPersonalNote);

        const notes = [
            { title: 'iPhone 18 tiêu chuẩn có thể không ra mắt năm 2026', content: 'Apple được cho là không trình làng iPhone 18 tiêu chuẩn vào tháng 9, đánh dấu sự thay đổi lớn nhất trong chiến lược phát hành sản phẩm của hãng sau hơn một thập kỷ.' },
            { title: '6 sản phẩm Apple có thể ra mắt năm 2026', content: 'Apple được dự đoán công bố nhiều nâng cấp đột phá cho các dòng thiết bị hiện có như iPhone gập, HomeHub hay Studio Display.' },
            { title: 'Mộ Tần Thủy Hoàng chưa ai dám mở sau 2.200 năm', content: 'Với thiết kế phức tạp, có thể chứa bẫy phòng thủ và thủy ngân độc hại, lăng mộ Tần Thủy Hoàng chưa từng được mở suốt hàng nghìn năm.' },
            { title: 'AI đe dọa 200.000 việc làm ngành ngân hàng châu Âu', content: 'Đến năm 2030, các ngân hàng châu Âu có thể cắt giảm hơn 200.000 vị trí do tăng cường ứng dụng AI và đóng cửa nhiều chi nhánh vật lý.' },
            { title: 'FPT xuất khẩu lô chip nguồn đầu tiên sang Nhật Bản', content: 'FPT cho biết vừa bàn giao lô chip nguồn cho đối tác Nhật Bản, bước đầu hiện thực hóa mục tiêu xuất khẩu chip tự thiết kế cho thị trường châu Á.' },
            { title: 'Công việc lương nửa triệu USD khó khả thi tại OpenAI', content: 'OpenAI tuyển vị trí ngăn chặn rủi ro AI với mức lương 555.000 USD mỗi năm, nhưng được đánh giá là "nhiệm vụ gần như bất khả thi".' },
            { title: 'Con người có thể cần huấn luyện để phân biệt khuôn mặt AI tạo', content: 'Khuôn mặt do AI tạo ngày càng giống thật khiến con người dễ nhầm lẫn, nhưng huấn luyện ngắn hạn sẽ giúp cải thiện đáng kể khả năng phán đoán.' },
            { title: 'Việt Nam có thêm mạng lưới trung tâm dữ liệu AI tỷ USD', content: 'Dự án trung tâm dữ liệu AI công suất 100 MW, tổng vốn một tỷ USD, sẽ được triển khai theo ba giai đoạn tại Việt Nam.' },
            { title: 'Trung Quốc ra chip quang học đột phá trong huấn luyện AI', content: 'LightGen, chip quang học đầu tiên thế giới cho AI do Trung Quốc sản xuất, có khả năng chạy các mô hình AI tạo sinh quy mô lớn.' },
            { title: 'Hai hiện tượng hiếm xảy ra cùng lúc trên bầu trời', content: 'Nhiếp ảnh gia Italy Valter Binotto chụp quầng sáng Elve và sét dị hình Sprite màu đỏ xuất hiện trên biển Adriatic, giữa bán đảo Italy và bán đảo Balkan.' }
        ]

        // Thêm mới 10 notes có nội dung là tiêu đề và một phần ngắn (khoảng 3 dòng) tại báo https://vnexpress.net/khoa-hoc
        for (let i = 0; i < notes.length; i++) {
            await personalNotePage.addNote(notes[i].title, notes[i].content);
        }

        // Thực hiện search theo keyword bất kì.
        let keyword = "Apple";
        await personalNotePage.searchNote(keyword);

        // Kiểm tra tất cả các bài báo search được đều chứa keyword đã tìm kiếm.
        //await expect(page.locator("//ul[@id='notes-list']")).toContainText(keyword);
        const noteItems = page.locator('//ul[@id="notes-list"]/li');
        const count = await noteItems.count();
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                await expect(noteItems.nth(i)).toContainText(keyword);
            }
        } else {
            console.log("No result found");
        }

        await page.close();
    })
})