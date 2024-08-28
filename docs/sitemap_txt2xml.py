# -*- coding: utf-8 -*-

# sitemap.txtをsitemap.xmlに変換するスクリプト

# sitemap.txtファイルのパス
sitemap_txt_path = "./sitemap.txt"
# 書き出すsitemap.xmlファイルのパス
sitemap_xml_path = "./sitemap.xml"

print(f"サイトマップファイル {sitemap_txt_path} から {sitemap_xml_path} に変換するスクリプト")

# sitemap.txtを読み込んでsitemap.xmlに書き出す
with open(sitemap_txt_path, "r") as txt_file, open(sitemap_xml_path, "w") as xml_file:
    xml_file.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
    xml_file.write("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n")
    
    for line in txt_file:
        # 1行ずつ読み込んで<url>要素を作成
        url = line.strip()  # 改行を削除
        xml_file.write(f"  <url>\n    <loc>{url}</loc>\n  </url>\n")
    
    xml_file.write("</urlset>\n")

print(f"{sitemap_txt_path}から{sitemap_xml_path}に変換しました")

