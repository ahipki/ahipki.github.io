using HtmlAgilityPack;

public class CreateIndexPartitionsCouleurs
{
    public const string partitionsCouleurs = "C:\\Users\\ninie\\Documents\\GitHub\\ahipki.github.io\\PartitionsCouleurs";
    public const string indexHTML = "C:\\Users\\ninie\\Documents\\GitHub\\ahipki.github.io\\index.html";

    public static void Main(string[] args)
    {
        DirectoryInfo di = new DirectoryInfo(partitionsCouleurs);
        var root = di?.Parent?.FullName;

        using (StreamWriter writer = new StreamWriter(indexHTML))
        {
            AddHTML1(writer, indexHTML);

            if (Directory.Exists(partitionsCouleurs) && !string.IsNullOrEmpty(root))
            {
                foreach (var file in Directory.GetFiles(partitionsCouleurs))
                {
                    if (!file.EndsWith(".lnk"))
                    {
                        var doc = new HtmlDocument();
                        doc.Load(file);
                        var versionNode = doc.DocumentNode.Descendants(0).Where(n => n.HasClass("version")).FirstOrDefault();
                        var instruNode = doc.DocumentNode.Descendants(0).Where(n => n.HasClass("instru")).FirstOrDefault();
                        var tonaNode = doc.DocumentNode.Descendants(0).Where(n => n.HasClass("tona")).FirstOrDefault();
                        var dureeNode = doc.DocumentNode.Descendants(0).Where(n => n.HasClass("Duree")).FirstOrDefault();
                        var categorieNode = doc.DocumentNode.Descendants(0).Where(n => n.HasClass("Categories")).FirstOrDefault();

                        string lien = $".\\{Path.GetRelativePath(root, file)}";
                        string titre = Path.GetFileName(file).Replace(".html", string.Empty);
                        string version = versionNode is null ? string.Empty : versionNode.InnerText;
                        string instru = instruNode is null ? string.Empty : instruNode.InnerText;
                        string tona = tonaNode is null ? string.Empty : tonaNode.InnerText;
                        string duree = dureeNode is null ? string.Empty : dureeNode.GetAttributeValue("value", "");
                        string categories = categorieNode is null ? string.Empty : categorieNode.GetAttributeValue("value", "");
                        AddHTMLContenu(writer, lien, titre, version, instru, tona, duree, categories);
                        Console.WriteLine($"{file} added to indexHTML");
                    }
                }
            }
            else
            {
                Console.WriteLine("{0} is not a valid directory.", partitionsCouleurs);
            }

            AddHTML2(writer, indexHTML);
        }

    }

    private static void AddHTMLContenu(StreamWriter writer, string lien, string titre, string version, string instru, string tona, string duree, string categories)
    {
        string htmlToReplace = @"            <tr>
                <td><a href=""lien"">titre</a></td>
                <td>version</td>
                <td>instru</td>
                <td>tona</td>
                <td>duree</td>
                <td>categories</td>
            </tr>";
        htmlToReplace = htmlToReplace.Replace("lien", lien);
        htmlToReplace = htmlToReplace.Replace("titre", titre);
        htmlToReplace = htmlToReplace.Replace("instru", instru);
        htmlToReplace = htmlToReplace.Replace("version", version);
        htmlToReplace = htmlToReplace.Replace("tona", tona);
        htmlToReplace = htmlToReplace.Replace("duree", duree);
        htmlToReplace = htmlToReplace.Replace("categories", categories);
        writer.WriteLine(htmlToReplace);
    }
    private static void AddHTML2(StreamWriter writer, string indexHTML)
    {
        writer.WriteLine(@"        </tbody>
    </table>
    <br>
</body>

</html>
");
    }

    private static void AddHTML1(StreamWriter writer, string indexHTML)
    {
        writer.WriteLine(@"<!DOCTYPE html>
<html>

<head>
    <meta charset=""utf-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">

    <title>Liste Partitions en Couleurs</title>
    <link rel=""stylesheet"" href=""dist/sortable-tables.min.css"">
    <script src=""dist/sortable-tables.min.js"" type=""text/javascript""></script>
</head>
<style>
    table {
        width: 100%;
        border-collapse: collapse
    }
    td, th {
        padding: 10px;
        border: 1px solid #000
    }
</style>
<body>
    <h1>Liste Partitions en Couleurs</h1>
    <table class=""sortable-table"">
        <thead>
            <tr>
                <th>Lien</th>
                <th>Version</th>
                <th>Instru</th>
                <th>Tona</th>
                <th>Durée</th>
                <th>Catégories</th>
            </tr>
        </thead>

        <tbody>");
    }
}